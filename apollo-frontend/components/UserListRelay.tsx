'use client';

import { graphql, useLazyLoadQuery } from 'react-relay';
import type { UserListRelayQuery } from './__generated__/UserListRelayQuery.graphql';

const UserListQuery = graphql`
  query UserListRelayQuery($name: String) {
    users(name: $name) {
      id
      name
      email
      age
    }
  }
`;

export function UserList() {
  const data = useLazyLoadQuery<UserListRelayQuery>(UserListQuery, { name: undefined });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid gap-4">
        {data.users?.map((user) => user && (
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