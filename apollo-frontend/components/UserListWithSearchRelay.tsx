'use client';

import { useState, Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { UserListWithSearchRelayQuery } from './__generated__/UserListWithSearchRelayQuery.graphql';

const UserListQuery = graphql`
  query UserListWithSearchRelayQuery($name: String) {
    users(name: $name) {
      id
      name
      email
      age
    }
  }
`;

function UserListContent({ searchName }: { searchName: string }) {
  const data = useLazyLoadQuery<UserListWithSearchRelayQuery>(
    UserListQuery,
    { name: searchName || undefined }
  );

  return (
    <div className="grid gap-4">
      {data.users?.length === 0 && (
        <p className="text-gray-500 text-center">No users found.</p>
      )}
      {data.users?.map((user) => user && (
        <div key={user.id} className="border rounded p-4 hover:bg-gray-50">
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          {user.age && <p className="text-sm text-gray-500">Age: {user.age}</p>}
        </div>
      ))}
    </div>
  );
}

export function UserListWithSearch() {
  const [searchName, setSearchName] = useState('');

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

      <Suspense fallback={<div className="text-center p-4">Loading users...</div>}>
        <UserListContent searchName={searchName} />
      </Suspense>
    </div>
  );
}