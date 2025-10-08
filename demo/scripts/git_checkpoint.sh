#!/usr/bin/env bash
# Quick checkpoint commit without pushing (useful mid-demo)
set -euo pipefail
msg="${1:-chore: checkpoint ($(date +'%Y-%m-%d %H:%M:%S'))}"
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi
git commit -m "$msg"
echo "Checkpoint committed locally: $msg"
