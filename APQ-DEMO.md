# APQ (Automatic Persisted Queries) デモ

## フロントエンドで必要な設定

### 1. 必要なパッケージのインストール
```bash
npm install crypto-hash
```

### 2. Apollo Clientの設定
```typescript
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

const apolloClient = new ApolloClient({
  link: persistedQueriesLink.concat(httpLink),
  cache: new InMemoryCache(),
});
```

## 動作確認方法

### ブラウザでの確認
1. 開発者ツール → Networkタブを開く
2. アプリケーションでクエリを実行
3. 以下の動作を確認：

#### 初回リクエスト
- Method: `POST`
- Payload: クエリ全文 + SHA256ハッシュ
- サーバーはクエリをキャッシュに保存

#### 2回目以降
- Method: `GET`  
- URL: `?extensions={"persistedQuery":{"version":1,"sha256Hash":"..."}}`
- クエリ本文は送信されない

### 具体例
初回（POST）:
```json
{
  "query": "query GetAllUsers { users { id name email age } }",
  "extensions": {
    "persistedQuery": {
      "version": 1,
      "sha256Hash": "abc123..."
    }
  }
}
```

2回目以降（GET）:
```
http://localhost:4000/?extensions={"persistedQuery":{"version":1,"sha256Hash":"abc123..."}}
```

## APQのメリット
1. **ネットワーク効率**: 大きなクエリでも2回目以降は数十バイトのハッシュのみ
2. **キャッシュ可能**: GETリクエストはCDNでキャッシュ可能
3. **自動**: クライアントが自動的にハッシュを生成・送信

## 注意点
- サーバー再起動でキャッシュがクリアされる（インメモリの場合）
- 初回は必ずPOSTでクエリ全文を送信する必要がある