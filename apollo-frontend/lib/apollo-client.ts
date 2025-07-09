import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import persistedQueryManifest from '../persisted-query-manifest.json';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

// カスタムsha256関数: マニフェストから既知のハッシュを返す
const customSha256 = async (query: string) => {
  // queryからオペレーション名を抽出
  const match = query.match(/query\s+(\w+)/);
  if (match && match[1]) {
    const operationName = match[1];
    const hash = persistedQueryManifest[operationName as keyof typeof persistedQueryManifest];
    if (hash) {
      console.log(`Using pre-generated hash for ${operationName}: ${hash}`);
      return hash;
    }
  }
  // マニフェストに存在しない場合は通常のsha256を使用
  console.log('Generating hash dynamically for query');
  return sha256(query);
};

const persistedQueriesLink = createPersistedQueryLink({
  sha256: customSha256,
  useGETForHashedQueries: true,
});

export const apolloClient = new ApolloClient({
  link: persistedQueriesLink.concat(httpLink),
  cache: new InMemoryCache(),
});