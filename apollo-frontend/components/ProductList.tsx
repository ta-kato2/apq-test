'use client';

import { useQuery } from 'urql';
import { GET_ALL_PRODUCTS } from '@/lib/queries';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  inStock: boolean;
}

export function ProductList() {
  const [result] = useQuery<{ products: Product[] }>({
    query: GET_ALL_PRODUCTS,
    variables: { name: undefined },
  });

  const { data, fetching, error } = result;

  if (fetching) return <div className="text-center p-4">Loading products...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid gap-4 md:grid-cols-2">
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