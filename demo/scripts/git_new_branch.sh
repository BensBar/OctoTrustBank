#!/usr/bin/env bash
# Create/switch to a new branch and push upstream
set -euo pipefail
name_base="${1:-feature/demo}"
ts=$(date +'%Y%m%d-%H%M%S')
branch="${name_base}-${ts}"
git checkout -b "$branch"
git push -u origin "$branch"
echo "Created and pushed new branch: $branch"
