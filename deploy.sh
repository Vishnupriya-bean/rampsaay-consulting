#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  deploy.sh — Build & upload Rampsaay Consulting to VPS
#  Usage: bash deploy.sh
#
#  Credentials are loaded from .env.deploy (gitignored)
#  Copy .env.deploy.example → .env.deploy and fill in your values
# ─────────────────────────────────────────────────────────────

set -e

# Load env vars from .env.deploy
if [ -f ".env.deploy" ]; then
  export $(grep -v '^#' .env.deploy | xargs)
else
  echo "❌  .env.deploy not found."
  echo "    Copy .env.deploy.example → .env.deploy and fill in your VPS details."
  exit 1
fi

# Validate required vars
: "${VPS_USER:?'VPS_USER is not set in .env.deploy'}"
: "${VPS_HOST:?'VPS_HOST is not set in .env.deploy'}"
: "${REMOTE_DIR:?'REMOTE_DIR is not set in .env.deploy'}"

echo "▶  Building production bundle..."
npm run build

echo "▶  Uploading dist/ → $VPS_USER@$VPS_HOST:$REMOTE_DIR"
rsync -avz --delete dist/ "$VPS_USER@$VPS_HOST:$REMOTE_DIR/"

echo "▶  Reloading Nginx..."
ssh "$VPS_USER@$VPS_HOST" "nginx -t && systemctl reload nginx"

echo "✅  Deploy complete → https://rampsaayconsulting.xyz/"
