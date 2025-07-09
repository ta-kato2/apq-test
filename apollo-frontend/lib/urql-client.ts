import { Client, cacheExchange, fetchExchange } from 'urql';
import { persistedExchange } from '@urql/exchange-persisted';

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
      generateHash: async (query) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(query);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      },
    }),
    fetchExchange,
  ],
});