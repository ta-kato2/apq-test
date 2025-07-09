const crypto = require('crypto');

module.exports = {
  plugin: (schema, documents, config) => {
    const manifest = {
      format: 'apollo-persisted-query-manifest',
      version: 1,
      operations: []
    };

    documents.forEach((doc) => {
      if (doc.document) {
        doc.document.definitions.forEach((def) => {
          if (def.kind === 'OperationDefinition' && def.operation === 'query') {
            const operationName = def.name?.value;
            if (operationName) {
              // クエリ文字列を取得
              const queryString = doc.rawSDL || '';
              
              // SHA256ハッシュを生成
              const hash = crypto.createHash('sha256').update(queryString).digest('hex');
              
              manifest.operations.push({
                id: hash,
                body: queryString,
                name: operationName,
                type: 'query'
              });
            }
          }
        });
      }
    });

    return JSON.stringify(manifest, null, 2);
  }
};