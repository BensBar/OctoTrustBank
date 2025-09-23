// Utility to get correct image paths for different environments

interface RuntimeConfig {
  API_URL?: string;
  BASE_PATH?: string;
  IS_GITHUB_PAGES?: boolean;
  USE_MOCK_DATA?: boolean;
}

export const getImagePath = (imageName: string): string => {
  const runtimeConfig = (window as { RUNTIME_CONFIG?: RuntimeConfig }).RUNTIME_CONFIG;
  const basePath = runtimeConfig?.BASE_PATH || '';
  const isGitHubPages = runtimeConfig?.IS_GITHUB_PAGES || false;
  
  if (isGitHubPages) {
    // For GitHub Pages, images are in the repository root
    return `${basePath}/${imageName}`;
  }
  
  // For local development, images are in the public folder
  return `/${imageName}`;
};

export const getHeroImagePath = (): string => {
  return getImagePath('hero.jpg');
};

export const getBankLogoPath = (): string => {
  return getImagePath('copilot.png');
};
