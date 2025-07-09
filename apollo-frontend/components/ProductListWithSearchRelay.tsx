'use client';

import { useState, Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { ProductListWithSearchRelayQuery } from './__generated__/ProductListWithSearchRelayQuery.graphql';

const ProductListQuery = graphql`
  query ProductListWithSearchRelayQuery($name: String) {
    products(name: $name) {
      id
      name
      price
      description
      inStock
    }
  }
`;

function ProductListContent({ searchName }: { searchName: string }) {
  const data = useLazyLoadQuery<ProductListWithSearchRelayQuery>(
    ProductListQuery,
    { name: searchName || undefined }
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.products?.length === 0 && (
        <p className="text-gray-500 text-center col-span-2">No products found.</p>
      )}
      {data.products?.map((product) => product && (
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
  );
}

export function ProductListWithSearch() {
  const [searchName, setSearchName] = useState('');

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

      <Suspense fallback={<div className="text-center p-4">Loading products...</div>}>
        <ProductListContent searchName={searchName} />
      </Suspense>
    </div>
  );
}