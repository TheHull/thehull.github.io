#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  . "$HOME/.nvm/nvm.sh"
  nvm use --silent
fi
if [ ! -d node_modules ]; then
  npm ci
fi
exec npm run dev -- --host 127.0.0.1
