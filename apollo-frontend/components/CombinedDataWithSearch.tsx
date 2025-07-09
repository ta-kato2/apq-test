'use client';

import { useState } from 'react';
import { useQuery } from 'urql';
import { GET_COMBINED_DATA } from '@/lib/queries';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface CombinedData {
  users: User[];
  products: Product[];
}

export function CombinedDataWithSearch() {
  const [userSearch, setUserSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  
  const [result] = useQuery<CombinedData>({
    query: GET_COMBINED_DATA,
    variables: {
      userName: userSearch || undefined,
      productName: productSearch || undefined,
    },
  });

  const { data, fetching, error } = result;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Combined Query Result</h2>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Search products by name..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {fetching && <div className="text-center p-4">Loading data...</div>}
      {error && <div className="text-red-500 p-4">Error: {error.message}</div>}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Users ({data?.users.length || 0})</h3>
          <div className="space-y-2">
            {data?.users.length === 0 && (
              <p className="text-gray-500">No users found.</p>
            )}
            {data?.users.map((user) => (
              <div key={user.id} className="bg-gray-50 p-3 rounded">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Products ({data?.products.length || 0})</h3>
          <div className="space-y-2">
            {data?.products.length === 0 && (
              <p className="text-gray-500">No products found.</p>
            )}
            {data?.products.map((product) => (
              <div key={product.id} className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{product.name}</p>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </div>
                <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}