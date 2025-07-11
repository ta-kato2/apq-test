import { Client, cacheExchange, fetchExchange } from 'urql';
import { persistedExchange } from '@urql/exchange-persisted';
import persistedQueryManifest from '../persisted-query-manifest.json';

// マニフェストから既知のハッシュを返すカスタム関数
const generateHashFromManifest = async (query: string) => {
  // queryからオペレーション名を抽出
  const match = query.match(/query\s+(\w+)/);
  if (match && match[1]) {
    const operationName = match[1];
    // マニフェストからハッシュを検索
    const operation = persistedQueryManifest.operations.find(op => op.name === operationName);
    if (operation) {
      console.log(`Using pre-generated hash for ${operationName}: ${operation.id}`);
      return operation.id;
    }
  }
  
  // マニフェストに存在しない場合は動的に生成
  console.log('Generating hash dynamically for query');
  const encoder = new TextEncoder();
  const data = encoder.encode(query);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const urqlClient = new Client({
  url: 'http://localhost:4000',
  fetchOptions: {
    headers: {
      'content-type': 'application/json',
    },
  },
  exchanges: [
    cacheExchange,
    persistedExchange({
      preferGetForPersistedQueries: true,
      generateHash: generateHashFromManifest,
    }),
    fetchExchange,
  ],
});