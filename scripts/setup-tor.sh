#!/usr/bin/env bash
# setup-tor.sh — One-time Tor hidden service setup for paymentcode.io
# Run as root from the repo root: sudo bash scripts/setup-tor.sh
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HIDDEN_SERVICE_DIR="/var/lib/tor/hidden_service"

echo "==> Installing tor..."
apt-get update -qq
apt-get install -y --no-install-recommends tor

echo "==> Deploying torrc..."
cp "$REPO_DIR/tor/torrc" /etc/tor/torrc

echo "==> Setting up hidden service directory..."
mkdir -p "$HIDDEN_SERVICE_DIR"
chown -R debian-tor:debian-tor /var/lib/tor
chmod 700 "$HIDDEN_SERVICE_DIR"

echo "==> Enabling and starting tor service..."
systemctl enable tor
systemctl restart tor

echo "==> Waiting for .onion address to be generated..."
for i in $(seq 1 12); do
  if [ -f "$HIDDEN_SERVICE_DIR/hostname" ]; then
    break
  fi
  sleep 5
done

if [ ! -f "$HIDDEN_SERVICE_DIR/hostname" ]; then
  echo "ERROR: .onion address not generated after 60s. Check: journalctl -u tor -n 50"
  exit 1
fi

ONION_ADDRESS=$(cat "$HIDDEN_SERVICE_DIR/hostname")
echo ""
echo "======================================================"
echo "  Tor hidden service is running!"
echo "  .onion address: $ONION_ADDRESS"
echo "======================================================"
echo ""
echo "Next steps:"
echo "  1. Add to your .env on this VPS:"
echo "     ONION_ADDRESS=$ONION_ADDRESS"
echo "  2. Restart the Node.js app (e.g. pm2 restart bip47)"
echo "  3. Tor Browser will now show a 'Use Onion Site' prompt"
echo ""
echo "To back up your hidden service key (keep it safe!):"
echo "  cp -r $HIDDEN_SERVICE_DIR ~/tor-hidden-service-backup"
