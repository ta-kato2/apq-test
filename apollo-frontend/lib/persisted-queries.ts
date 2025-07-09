// 生成されたpersisted-queries.jsonからインポート
import persistedQueries from '../persisted-queries.json';

export function getPersistedQuery(id: string): string | undefined {
  return (persistedQueries as Record<string, string>)[id];
}