'use client';

import { Provider } from 'urql';
import { urqlClient } from './urql-client';

export function UrqlWrapper({ children }: { children: React.ReactNode }) {
  return <Provider value={urqlClient}>{children}</Provider>;
}