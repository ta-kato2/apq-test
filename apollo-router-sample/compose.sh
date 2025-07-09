#!/bin/bash

# Rover CLIを使ってスーパーグラフスキーマを生成
echo "Generating supergraph schema..."

# Roverのパスを追加
export PATH="$HOME/.rover/bin:$PATH"

# Roverがインストールされていない場合の指示
if ! command -v rover &> /dev/null; then
    echo "Rover CLI is not installed. Please install it first:"
    echo "curl -sSL https://rover.apollo.dev/nix/latest | sh"
    exit 1
fi

# スーパーグラフスキーマを生成
rover supergraph compose --config ./router/supergraph.yaml > ./router/supergraph.graphql

echo "Supergraph schema generated successfully!"