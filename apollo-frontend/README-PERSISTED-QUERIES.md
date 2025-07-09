# Apollo GraphOS Persisted Queries設定ガイド

このガイドでは、Apollo GraphOSにPersisted Queriesを登録する手順を説明します。

## 前提条件

- Apollo GraphOSアカウント
- Rover CLIのインストール
- GraphOSに作成済みのGraph

## セットアップ手順

### 1. Rover CLIのインストール

```bash
npm install -g @apollo/rover
```

### 2. Rover認証

```bash
rover config auth
```

Apollo GraphOSのPersonal API Keyを入力してください。

### 3. GraphOSでGraphを作成

1. [Apollo Studio](https://studio.apollographql.com/)にログイン
2. 新しいGraphを作成
3. Graph IDをメモ（例: `my-graph`）

### 4. Persisted Query Manifestの生成

```bash
npm run generate-manifest
```

これにより`persisted-query-manifest.json`が生成されます。

### 5. ManifestをApollo GraphOSに公開

```bash
# Graph IDとvariantを適切な値に置き換えてください
rover persisted-queries publish my-graph@current \
  --manifest ./persisted-query-manifest.json
```

または、package.jsonのスクリプトを編集して使用：

```bash
npm run publish-manifest
```

### 6. Apollo Routerの設定

本番環境では、`apollo-router-sample/router/router.yaml`を以下のように更新：

```yaml
persisted_queries:
  enabled: true
  safelist:
    enabled: true    # セーフリストを有効化
    require_id: true # IDのみを許可（クエリ本文を拒否）
apq:
  enabled: false     # APQを無効化（セーフリストのみ使用）
```

## 開発ワークフロー

### ローカル開発

1. 新しいクエリを追加
2. `npm run generate-manifest`でマニフェストを再生成
3. 開発環境でテスト

### CI/CDパイプライン

```yaml
# GitHub Actionsの例
- name: Generate Persisted Query Manifest
  run: npm run generate-manifest
  
- name: Publish to Apollo GraphOS
  env:
    APOLLO_KEY: ${{ secrets.APOLLO_KEY }}
  run: |
    rover persisted-queries publish ${{ vars.GRAPH_ID }}@${{ vars.GRAPH_VARIANT }} \
      --manifest ./persisted-query-manifest.json
```

## トラブルシューティング

### 未登録クエリのデバッグ

Apollo Routerのログで未登録クエリを確認：

```yaml
persisted_queries:
  enabled: true
  log_unknown: true  # 未登録クエリをログに記録
```

### マニフェストの検証

生成されたマニフェストが正しい形式か確認：

```bash
cat persisted-query-manifest.json | jq .
```

## セキュリティのベストプラクティス

1. **本番環境では必ずセーフリストを有効化**
2. **CI/CDでマニフェストの公開を自動化**
3. **定期的に未使用のクエリを削除**
4. **Apollo Studioでクエリの使用状況を監視**

## 参考リンク

- [Apollo GraphOS Persisted Queries Documentation](https://www.apollographql.com/docs/graphos/operations/persisted-queries/)
- [Rover CLI Documentation](https://www.apollographql.com/docs/rover/)
- [Apollo Router Configuration](https://www.apollographql.com/docs/router/configuration/persisted-queries/)