import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  RequestParameters,
  Variables,
  CacheConfig,
  GraphQLResponse,
} from 'relay-runtime';
import { getPersistedQuery } from './persisted-queries';

const HTTP_ENDPOINT = 'http://localhost:4000';

// APQ用のキャッシュ
const queryCache = new Map<string, string>();

const fetchFn: FetchFunction = async (
  params: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
) => {
  // cacheConfigでネットワークスキップを防ぐ
  if (cacheConfig && cacheConfig.force) {
    console.log('Forcing network request for:', params.name);
  }

  const queryId = params.id || params.cacheID;
  let body: any;
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  // Relayでは、params.textが提供されない場合がある
  // その場合は、idを使用してpersisted-queries.jsonから取得する
  let queryText = params.text;
  if (!queryText && queryId) {
    queryText = getPersistedQuery(queryId);
    if (queryText) {
      console.log('Using persisted query for id:', queryId);
    }
  }
  
  // APQサポート - 初回はクエリキャッシュをチェック
  const hash = queryText ? await generateHash(queryText) : queryId;
  const cachedQuery = hash ? queryCache.get(hash) : null;
  
  // 2回目以降の試行: キャッシュがあればGETリクエストで送信
  if (cachedQuery && hash) {
    const extensions = JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash: hash,
      },
    });
    
    const url = `${HTTP_ENDPOINT}?extensions=${encodeURIComponent(extensions)}&variables=${encodeURIComponent(JSON.stringify(variables))}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      
      const json = await response.json();
      
      if (!json.errors || !json.errors.some((e: any) => e.message?.includes('PersistedQueryNotFound'))) {
        console.log('APQ hit (GET) for:', params.name);
        return json as GraphQLResponse;
      }
    } catch (e) {
      console.log('APQ GET failed, falling back to POST');
    }
  }
  
  // 初回またはGET失敗時: POSTでクエリ全文を送信
  if (!queryText) {
    throw new Error(`Query text not available for ${params.name}`);
  }
  
  body = JSON.stringify({
    query: queryText,
    variables,
    ...(hash && {
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: hash,
        },
      },
    }),
  });
  
  // キャッシュに保存
  if (hash && queryText) {
    queryCache.set(hash, queryText);
  }

  const response = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers,
    body,
  });

  const json = await response.json();

  if (Array.isArray(json.errors)) {
    console.error(json.errors);
    throw new Error(
      `Error fetching GraphQL query '${params.name}' with variables '${JSON.stringify(variables)}': ${JSON.stringify(json.errors)}`,
    );
  }

  return json as GraphQLResponse;
};

// SHA256ハッシュ生成
async function generateHash(query: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(query);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});