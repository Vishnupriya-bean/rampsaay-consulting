#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  deploy.sh — Build & upload Rampsaay Consulting to VPS
#  Usage: bash deploy.sh
#
#  !! Edit the three variables below before running !!
# ─────────────────────────────────────────────────────────────

VPS_USER="root"                         # your VPS SSH username
VPS_HOST="your.vps.ip.address"          # your VPS IP or hostname
REMOTE_DIR="/var/www/rampsaayconsulting.xyz/html"

set -e

echo "▶  Building production bundle..."
npm run build

echo "▶  Uploading dist/ to VPS..."
rsync -avz --delete dist/ "$VPS_USER@$VPS_HOST:$REMOTE_DIR/"

echo "▶  Reloading Nginx..."
ssh "$VPS_USER@$VPS_HOST" "nginx -t && systemctl reload nginx"

echo "✅  Deploy complete → https://rampsaayconsulting.xyz/"
