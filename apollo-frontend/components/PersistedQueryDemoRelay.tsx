'use client';

import { useState, useCallback } from 'react';
import { graphql, fetchQuery } from 'react-relay';
import RelayEnvironment from '@/lib/relay-environment';
import type { PersistedQueryDemoRelayQuery } from './__generated__/PersistedQueryDemoRelayQuery.graphql';

const SimpleQuery = graphql`
  query PersistedQueryDemoRelayQuery {
    users {
      id
      name
    }
  }
`;

export function PersistedQueryDemo() {
  const [queryResult, setQueryResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [executeCount, setExecuteCount] = useState(0);

  const executeQuery = useCallback(async () => {
    setLoading(true);
    setExecuteCount(prev => prev + 1);
    
    try {
      const result = await fetchQuery(
        RelayEnvironment,
        SimpleQuery,
        {},
        { fetchPolicy: 'network-only' }
      ).toPromise();
      
      setQueryResult(result);
    } catch (error) {
      console.error('Query error:', error);
      setQueryResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Persisted Query Demo (Relay)</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Click the button to execute a query. The first request will send the full query with APQ extension,
          and subsequent requests will try to use only the hash via GET request.
        </p>
        
        <button
          onClick={executeQuery}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Execute Query'}
        </button>
        
        {executeCount > 0 && (
          <span className="ml-4 text-gray-600">
            Executed {executeCount} time{executeCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {queryResult && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Query Result:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(queryResult, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">How to verify APQ with Relay:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Open Developer Tools → Network tab and Console</li>
          <li>Click "Execute Query" button</li>
          <li>First request: POST with full query + APQ extension</li>
          <li>Click "Execute Query" again</li>
          <li>Check Console for "APQ hit (GET)" message if using cached hash</li>
          <li>Network tab: Look for GET requests in subsequent requests</li>
        </ol>
      </div>
    </div>
  );
}