'use client';

import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '@/lib/queries';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

export function UserList() {
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_ALL_USERS, {
    variables: { name: undefined },
  });

  if (loading) return <div className="text-center p-4">Loading users...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid gap-4">
        {data?.users.map((user) => (
          <div key={user.id} className="border rounded p-4 hover:bg-gray-50">
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            {user.age && <p className="text-sm text-gray-500">Age: {user.age}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}