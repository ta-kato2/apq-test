'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '@/lib/queries';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  inStock: boolean;
}

export function ProductListWithSearch() {
  const [searchName, setSearchName] = useState('');
  const { loading, error, data } = useQuery<{ products: Product[] }>(GET_ALL_PRODUCTS, {
    variables: { name: searchName || undefined },
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <div className="text-center p-4">Loading products...</div>}
      {error && <div className="text-red-500 p-4">Error: {error.message}</div>}

      <div className="grid gap-4 md:grid-cols-2">
        {data?.products.length === 0 && (
          <p className="text-gray-500 text-center col-span-2">No products found.</p>
        )}
        {data?.products.map((product) => (
          <div key={product.id} className="border rounded p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
            {product.description && (
              <p className="text-gray-600 mt-2">{product.description}</p>
            )}
            <p className={`mt-2 font-medium ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}