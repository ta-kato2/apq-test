import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000',
  documents: 'lib/queries.ts',
  generates: {
    // Apollo GraphOS形式のマニフェストを生成
    './persisted-query-manifest.json': {
      plugins: ['./scripts/codegen-apollo-manifest-plugin.js']
    }
  }
};

export default config;