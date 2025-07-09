'use client';

import { useState } from 'react';
import { useQuery } from 'urql';
import { GET_ALL_USERS } from '@/lib/queries';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

export function UserListWithSearch() {
  const [searchName, setSearchName] = useState('');
  const [result] = useQuery<{ users: User[] }>({
    query: GET_ALL_USERS,
    variables: { name: searchName || undefined },
  });

  const { data, fetching, error } = result;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {fetching && <div className="text-center p-4">Loading users...</div>}
      {error && <div className="text-red-500 p-4">Error: {error.message}</div>}

      <div className="grid gap-4">
        {data?.users.length === 0 && (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
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