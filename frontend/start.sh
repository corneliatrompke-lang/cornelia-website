#!/bin/sh
# Generates /app/build/config.js from runtime environment variables,
# then starts the static file server. This allows the same Docker image
# to be deployed to any environment by setting REACT_APP_BACKEND_URL
# without rebuilding.

set -e

BACKEND_URL="${REACT_APP_BACKEND_URL:-}"

cat > /app/build/config.js <<EOF
// Auto-generated at container startup by start.sh — do not edit manually.
window.env = {
  REACT_APP_BACKEND_URL: "${BACKEND_URL}",
};
EOF

echo "Runtime config written: REACT_APP_BACKEND_URL=${BACKEND_URL}"

exec serve -s build -l 8080
