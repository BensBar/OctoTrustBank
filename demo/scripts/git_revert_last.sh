#!/usr/bin/env bash
# HARD reset last commit (DANGEROUS). Use only if you need to undo a bad generation during demo.
set -euo pipefail
git reset --hard HEAD~1
echo "Reverted to previous commit."
