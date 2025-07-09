'use client';

import { useQuery } from '@apollo/client';
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

export function CombinedData() {
  const { loading, error, data } = useQuery<CombinedData>(GET_COMBINED_DATA, {
    variables: { userName: undefined, productName: undefined },
  });

  if (loading) return <div className="text-center p-4">Loading data...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Combined Query Result</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Users ({data?.users.length})</h3>
          <div className="space-y-2">
            {data?.users.map((user) => (
              <div key={user.id} className="bg-gray-50 p-3 rounded">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Products ({data?.products.length})</h3>
          <div className="space-y-2">
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