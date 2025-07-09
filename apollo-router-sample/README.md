# Apollo Router Sample

Apollo Routerを使用したGraphQL Federationのサンプルプロジェクトです。

## 構成

- **Apollo Router**: GraphQL Federationのゲートウェイ
- **Users Subgraph**: ユーザー情報を管理するサブグラフ（ポート4001）
- **Products Subgraph**: 商品情報を管理するサブグラフ（ポート4002）

## セットアップ

### 1. Rover CLIのインストール

```bash
curl -sSL https://rover.apollo.dev/nix/latest | sh
```

### 2. スーパーグラフスキーマの生成

```bash
cd apollo-router-sample
./compose.sh
```

### 3. サービスの起動

```bash
docker-compose up
```

## アクセス

- Apollo Router: http://localhost:4000
- Apollo Sandbox: http://localhost:4000 (ブラウザでアクセス)

## サンプルクエリ

### 全ユーザー取得
```graphql
query GetAllUsers {
  users {
    id
    name
    email
    age
  }
}
```

### 特定ユーザー取得
```graphql
query GetUser {
  user(id: "1") {
    id
    name
    email
    age
  }
}
```

### 全商品取得
```graphql
query GetAllProducts {
  products {
    id
    name
    price
    description
    inStock
  }
}
```

### 特定商品取得
```graphql
query GetProduct {
  product(id: "1") {
    id
    name
    price
    description
    inStock
  }
}
```

### 複数サブグラフにまたがるクエリ
```graphql
query CombinedQuery {
  users {
    id
    name
    email
  }
  products {
    id
    name
    price
    inStock
  }
}
```

## 停止方法

```bash
docker-compose down
```

## トラブルシューティング

### Roverがインストールされていない場合
上記のRover CLIインストールコマンドを実行してください。

### ポートが使用中の場合
docker-compose.ymlでポート番号を変更してください。