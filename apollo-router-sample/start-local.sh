#!/bin/bash

# サブグラフサービスを起動してスーパーグラフスキーマを生成するスクリプト

echo "Installing dependencies for subgraphs..."
cd subgraphs/users && npm install
cd ../products && npm install
cd ../..

echo "Starting subgraph services..."
# バックグラウンドでサブグラフを起動
(cd subgraphs/users && npm start) &
USERS_PID=$!

(cd subgraphs/products && npm start) &
PRODUCTS_PID=$!

# サービスの起動を待つ
echo "Waiting for services to start..."
sleep 5

# スーパーグラフスキーマを生成
echo "Generating supergraph schema..."
./compose.sh

# プロセスを終了
echo "Stopping subgraph services..."
kill $USERS_PID $PRODUCTS_PID

echo "Done! You can now run 'docker-compose up' to start all services."