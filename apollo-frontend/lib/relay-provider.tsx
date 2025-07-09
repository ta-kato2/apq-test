'use client';

import { ReactNode, useMemo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import RelayEnvironment from './relay-environment';

export function RelayProvider({ children }: { children: ReactNode }) {
  const environment = useMemo(() => RelayEnvironment, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}