#!/usr/bin/env bash
# One-push: stage everything, commit with timestamped message (or use first arg), and push current branch
set -euo pipefail
msg="${1:-chore: demo changes ($(date +'%Y-%m-%d %H:%M:%S'))}"
branch=$(git rev-parse --abbrev-ref HEAD)
git add -A
if git diff --cached --quiet; then
  echo "No staged changes. Nothing to commit."
  exit 0
fi
git commit -m "$msg"
git push origin "$branch"
echo "Pushed to origin/$branch with message: $msg"
