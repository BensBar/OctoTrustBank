(function () {
  // Default runtime configuration for development.
  // In production containers, this file is overwritten by entrypoint.sh.
  var protocol = typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.indexOf('https') !== -1
    ? 'https'
    : 'http';

  var host = (typeof window !== 'undefined' && window.location && window.location.hostname) || 'localhost';
  
  // Check if we're on GitHub Pages
  var isGitHubPages = host === 'bensbar.github.io' || host.includes('.github.io');
  var basePath = '';
  
  if (isGitHubPages) {
    // Extract repository name from pathname for GitHub Pages
    var pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && pathParts[0] !== '') {
      basePath = '/' + pathParts[0];
    }
  }
  
  // Detect GitHub Codespaces host pattern and map to API port 3000
  var codespacesMatch = host.match(/^(.*)-\d+\.app\.github\.dev$/) || host.match(/^(.*)-\d+\.githubpreview\.dev$/);
  var apiUrl;
  if (codespacesMatch) {
    apiUrl = protocol + '://' + codespacesMatch[1] + '-3000.app.github.dev';
  } else {
    apiUrl = protocol + '://localhost:3000';
  }

  window.RUNTIME_CONFIG = Object.assign({}, window.RUNTIME_CONFIG, { 
    API_URL: apiUrl,
    BASE_PATH: basePath,
    IS_GITHUB_PAGES: isGitHubPages
  });
})();
