# Contributing to OctoTrust Bank

Thank you for your interest in contributing to OctoTrust Bank! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming](#branch-naming)
- [Commit Conventions](#commit-conventions)
- [Testing Strategy](#testing-strategy)
- [Adding a New Route](#adding-a-new-route)
- [Code Review Process](#code-review-process)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- TypeScript knowledge
- Basic understanding of Express.js and React

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BensBar/OctoTrustBank.git
   cd OctoTrustBank
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the projects:**
   ```bash
   npm run build
   ```

4. **Initialize the database:**
   ```bash
   npm run db:init --workspace=api
   ```

5. **Start the development servers:**
   ```bash
   npm run dev
   ```

   Or start API and Frontend separately:
   ```bash
   # Terminal 1 - API
   npm run dev --workspace=api

   # Terminal 2 - Frontend
   npm run dev --workspace=frontend
   ```

### Verify Your Setup

- API should be running at `http://localhost:3000`
- Frontend should be running at `http://localhost:5137`
- Swagger docs available at `http://localhost:3000/api-docs`

## Development Workflow

1. **Create a new branch** (see [Branch Naming](#branch-naming))
2. **Make your changes** following existing patterns
3. **Write/update tests** for your changes
4. **Run tests locally** to ensure everything passes
5. **Build the project** to check for TypeScript errors
6. **Commit your changes** (see [Commit Conventions](#commit-conventions))
7. **Push and create a Pull Request**
8. **Address review feedback** if needed

## Branch Naming

Use descriptive branch names with the following prefixes:

- `feature/` - New features (e.g., `feature/add-customer-search`)
- `fix/` - Bug fixes (e.g., `fix/transaction-validation`)
- `refactor/` - Code refactoring (e.g., `refactor/repository-pattern`)
- `test/` - Test additions/improvements (e.g., `test/product-routes`)
- `docs/` - Documentation changes (e.g., `docs/update-api-guide`)
- `chore/` - Maintenance tasks (e.g., `chore/update-dependencies`)

Example: `test/add-supplier-route-tests`

## Commit Conventions

Write clear, concise commit messages:

```
<type>: <subject>

[optional body]

[optional footer]
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `style:` - Code style changes (formatting, etc.)

### Examples
```bash
feat: Add customer search endpoint
fix: Correct transaction validation logic
test: Add comprehensive tests for order routes
docs: Update API documentation for products
```

## Testing Strategy

### Test Types

1. **Unit Tests** - Repository and model logic
   - Use mocked database connections
   - Test individual functions in isolation
   - Located alongside the code (e.g., `suppliersRepo.test.ts`)

2. **Integration Tests** - API routes
   - Use in-memory SQLite database
   - Test complete request/response cycles
   - Located alongside routes (e.g., `branch.test.ts`)

3. **Model Tests** - Data validation
   - Test model validation rules
   - Ensure data integrity
   - Located in `api/src/models/*.test.ts`

### Running Tests

```bash
# Run all tests
npm test --workspace=api

# Run tests in watch mode
npm test --workspace=api -- --watch

# Run tests with coverage
npm run test:coverage --workspace=api
```

### Writing Tests

#### Route Tests Example

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import yourRouter from './your-route';
import { runMigrations } from '../db/migrate';
import { closeDatabase, getDatabase } from '../db/sqlite';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Your Route API', () => {
  beforeEach(async () => {
    // Setup in-memory database
    await closeDatabase();
    await getDatabase(true);
    await runMigrations(true);

    // Setup express app
    app = express();
    app.use(express.json());
    app.use('/your-route', yourRouter);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await closeDatabase();
  });

  it('should create a new item', async () => {
    const newItem = { name: 'Test Item' };
    const response = await request(app)
      .post('/your-route')
      .send(newItem);
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newItem);
  });

  it('should return 404 for non-existent item', async () => {
    const response = await request(app).get('/your-route/999');
    expect(response.status).toBe(404);
  });
});
```

#### Repository Tests Example

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { YourRepository } from './yourRepo';

vi.mock('../db/sqlite', () => ({
  getDatabase: vi.fn(),
}));

describe('YourRepository', () => {
  let repository: YourRepository;
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      run: vi.fn(),
      get: vi.fn(),
      all: vi.fn(),
      close: vi.fn(),
    };
    repository = new YourRepository(mockDb);
    vi.clearAllMocks();
  });

  // Add your tests here
});
```

### Test Coverage Guidelines

- **Minimum Coverage Target**: 70% overall (aspirational; not enforced yet)
- **Critical Path Coverage**: 90%+ for business logic
- **New Code**: Should include tests before merging

### Coverage Strategy

1. **Start with happy paths** - Basic CRUD operations
2. **Add error cases** - 404s, validation errors, malformed data
3. **Test edge cases** - Empty results, null values, boundary conditions
4. **Integration scenarios** - Multi-step workflows

## Adding a New Route

When adding a new API route, follow these steps:

### 1. Create the Route File

```typescript
// api/src/routes/yourRoute.ts
import express from 'express';
import { getYourRepository } from '../repositories/yourRepo';

const router = express.Router();

// Add Swagger documentation
/**
 * @swagger
 * /api/your-route:
 *   get:
 *     summary: Returns all items
 *     tags: [YourTag]
 *     responses:
 *       200:
 *         description: List of all items
 */

router.get('/', async (req, res, next) => {
  try {
    const repo = await getYourRepository();
    const items = await repo.findAll();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
```

### 2. Create the Repository

```typescript
// api/src/repositories/yourRepo.ts
import { getDatabase, DatabaseConnection } from '../db/sqlite';
import { YourModel } from '../models/yourModel';
import { handleDatabaseError, NotFoundError } from '../utils/errors';

export class YourRepository {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  async findAll(): Promise<YourModel[]> {
    try {
      const rows = await this.db.all('SELECT * FROM your_table');
      return rows.map(row => this.mapToModel(row));
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  private mapToModel(row: any): YourModel {
    // Map database row to model
    return {
      id: row.id,
      name: row.name,
      // ... other fields
    };
  }
}

export async function getYourRepository(): Promise<YourRepository> {
  const db = await getDatabase();
  return new YourRepository(db);
}
```

### 3. Create Tests

```typescript
// api/src/routes/yourRoute.test.ts
// See "Writing Tests" section above
```

### 4. Register the Route

```typescript
// api/src/index.ts
import yourRoutes from './routes/yourRoute';

// Add to middleware stack
app.use('/api/your-route', yourRoutes);
```

### 5. Update Documentation

- Update Swagger docs in route file
- Add any necessary README updates
- Document any new environment variables

## Code Review Process

### Before Submitting

- [ ] All tests pass locally
- [ ] Code builds without errors
- [ ] No linting issues
- [ ] Coverage not reduced
- [ ] PR template filled out
- [ ] Commits follow conventions

### Review Criteria

Reviewers will check for:

1. **Correctness** - Does the code work as intended?
2. **Tests** - Are there adequate tests?
3. **Error Handling** - Are errors properly handled?
4. **Security** - Are there any security concerns?
5. **Performance** - Any obvious performance issues?
6. **Maintainability** - Is the code readable and maintainable?
7. **Documentation** - Is documentation updated?

### Addressing Feedback

- Respond to all comments
- Make requested changes
- Re-request review when ready
- Resolve conversations when addressed

## Error Handling

Always use the custom error types:

```typescript
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors';

// Not found
throw new NotFoundError('Product', productId);

// Validation error
throw new ValidationError('Name is required', 'name');

// Conflict error
throw new ConflictError('Product already exists');
```

Routes should use the error handler middleware:

```typescript
app.use(errorHandler); // Add at the end of middleware stack
```

## Database Migrations

When adding/modifying database schema:

1. **Create new migration file:**
   ```bash
   # File: api/sql/migrations/003_your_description.sql
   ```

2. **Write migration SQL:**
   ```sql
   -- Add new table
   CREATE TABLE IF NOT EXISTS your_table (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate --workspace=api
   ```

4. **Update seed data if needed:**
   ```bash
   # Add to api/sql/seed/
   npm run db:seed --workspace=api
   ```

## Helpful Scripts

```bash
# List routes without tests
node scripts/list-untested-routes.js

# Build everything
npm run build

# Build specific workspace
npm run build --workspace=api
npm run build --workspace=frontend

# Run linters
npm run build --workspace=api  # TypeScript also acts as linter
```

## Getting Help

- Check existing code for patterns and examples
- Review the [Architecture Documentation](./docs/architecture.md)
- Read the [SQLite Integration Guide](./docs/sqlite-integration.md)
- Ask questions in PR comments
- Refer to existing tests for examples

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Vitest Documentation](https://vitest.dev/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [React Documentation](https://react.dev/)

---

Thank you for contributing to OctoTrust Bank! 🎉
