'use client';

import { useState } from 'react';
import { UserListWithSearch } from '@/components/UserListWithSearch';
import { ProductListWithSearch } from '@/components/ProductListWithSearch';
import { CombinedDataWithSearch } from '@/components/CombinedDataWithSearch';
import { PersistedQueryDemo } from '@/components/PersistedQueryDemo';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'combined' | 'persisted'>('users');

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Apollo GraphQL Frontend</h1>
      
      <div className="flex justify-center space-x-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'users'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'products'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('combined')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'combined'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Combined Query
        </button>
        <button
          onClick={() => setActiveTab('persisted')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'persisted'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Persisted Query Demo
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'users' && <UserListWithSearch />}
        {activeTab === 'products' && <ProductListWithSearch />}
        {activeTab === 'combined' && <CombinedDataWithSearch />}
        {activeTab === 'persisted' && <PersistedQueryDemo />}
      </div>
    </main>
  );
}