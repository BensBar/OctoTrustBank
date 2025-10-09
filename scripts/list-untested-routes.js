#!/usr/bin/env node

/**
 * List Untested Routes Script
 * 
 * This script scans the api/src/routes directory and identifies
 * route files that do not have a corresponding test file.
 * 
 * Usage:
 *   node scripts/list-untested-routes.js
 */

const fs = require('fs');
const path = require('path');

// Path to the routes directory
const ROUTES_DIR = path.join(__dirname, '../api/src/routes');

/**
 * Get all TypeScript files in the routes directory
 */
function getRouteFiles() {
  try {
    const files = fs.readdirSync(ROUTES_DIR);
    return files.filter(file => {
      return file.endsWith('.ts') && !file.endsWith('.test.ts') && !file.endsWith('.spec.ts');
    });
  } catch (error) {
    console.error(`Error reading routes directory: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Check if a test file exists for the given route file
 */
function hasTestFile(routeFile) {
  const baseName = routeFile.replace('.ts', '');
  const testFile = `${baseName}.test.ts`;
  const testPath = path.join(ROUTES_DIR, testFile);
  return fs.existsSync(testPath);
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Scanning for untested routes...\n');
  
  const routeFiles = getRouteFiles();
  const untestedRoutes = routeFiles.filter(file => !hasTestFile(file));
  
  if (untestedRoutes.length === 0) {
    console.log('✅ All routes have test files!\n');
    return;
  }
  
  console.log(`❌ Found ${untestedRoutes.length} route(s) without test files:\n`);
  
  untestedRoutes.forEach(route => {
    const testFileName = route.replace('.ts', '.test.ts');
    console.log(`  📄 ${route}`);
    console.log(`     Missing: ${testFileName}\n`);
  });
  
  console.log('💡 Tip: Create test files using the following pattern:');
  console.log('   - File: api/src/routes/<route>.test.ts');
  console.log('   - Import the router and use supertest for integration tests');
  console.log('   - See api/src/routes/branch.test.ts for an example\n');
  
  // Exit with error code if there are untested routes
  process.exit(untestedRoutes.length > 0 ? 1 : 0);
}

// Run the script
main();
