'use client';

import { useState } from 'react';
import { useQuery, gql } from 'urql';

const SIMPLE_QUERY = gql`
  query SimpleUserQuery {
    users {
      id
      name
    }
  }
`;

export function PersistedQueryDemo() {
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [executeCount, setExecuteCount] = useState(0);
  
  const [result, reexecuteQuery] = useQuery({
    query: SIMPLE_QUERY,
    pause: !isQueryEnabled,
    requestPolicy: 'network-only',
  });

  const { data, fetching, error } = result;

  const executeQuery = () => {
    if (!isQueryEnabled) {
      setIsQueryEnabled(true);
    } else {
      reexecuteQuery();
    }
    setExecuteCount(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Persisted Query Demo (URQL)</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Click the button below to execute a query. The first request will send the full query,
          and subsequent requests will use the persisted query hash.
        </p>
        
        <button
          onClick={executeQuery}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={fetching}
        >
          {fetching ? 'Loading...' : 'Execute Query'}
        </button>
        
        {executeCount > 0 && (
          <span className="ml-4 text-gray-600">
            Executed {executeCount} time{executeCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
          <p className="text-red-800">Error: {error.message}</p>
        </div>
      )}

      {data && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Query Result:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">How to verify Persisted Queries with URQL:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Open Developer Tools → Network tab</li>
          <li>Click "Execute Query" button</li>
          <li>First request: Look for POST request with full query in payload</li>
          <li>Click "Execute Query" again</li>
          <li>Second request: Look for GET request with only the query hash</li>
        </ol>
      </div>
    </div>
  );
}