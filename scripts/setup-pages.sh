#!/bin/bash

# Script to set up GitHub Pages deployment for OctoTrust Bank

echo "🚀 Setting up GitHub Pages deployment for OctoTrust Bank..."

# Check if GitHub CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first."
    echo "   Installation: https://cli.github.com/manual/installation"
    exit 1
fi

# Check if authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 Not authenticated with GitHub. Please authenticate:"
    gh auth login
fi

echo "📋 Current repository info:"
gh repo view --json name,owner,url

echo ""
echo "🔧 Enabling GitHub Pages..."

# Enable GitHub Pages for the repository
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/OWNER/REPO/pages \
  -f source='{"branch":"main","path":"/"}' \
  -f build_type='workflow' || echo "Pages might already be enabled"

echo ""
echo "🚀 Triggering GitHub Actions workflow..."

# Trigger the workflow
gh workflow run deploy-pages.yml

echo ""
echo "✅ Setup complete! Your OctoTrust Bank will be available at:"
echo "   https://$(gh repo view --json owner --jq .owner.login).github.io/OctoTrustBank/"
echo ""
echo "📋 You can check the deployment status with:"
echo "   gh run list --workflow=deploy-pages.yml"
echo ""
echo "🔗 Or visit the Actions tab in your GitHub repository."