#!/usr/bin/env bash
# Create a pull request using GitHub CLI (gh). Assumes you're authenticated in Codespaces.
set -euo pipefail
title="${1:-feat: demo change}"
body="${2:-Automated PR from Stream Deck demo.}"
base_branch="${3:-main}"
# Fill title/body from commit history and open PR
gh pr create --base "$base_branch" --title "$title" --body "$body" --fill --web || {
  echo "gh pr create failed. Ensure GitHub CLI is installed and authenticated."
  exit 1
}
