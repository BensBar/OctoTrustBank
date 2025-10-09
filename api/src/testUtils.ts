/**
 * Test Utilities for API Testing
 * 
 * This module provides helper functions and utilities for testing the API.
 * It includes app factory functions, data builders, and database reset hooks.
 */

import express from 'express';
import { getDatabase, closeDatabase } from '../src/db/sqlite';
import { runMigrations } from '../src/db/migrate';
import { errorHandler } from '../src/utils/errors';

/**
 * Create and configure an Express app for testing
 * 
 * @param router - The router to mount
 * @param basePath - The base path for the router (default: '/')
 * @returns Configured Express app
 */
export function createTestApp(router: express.Router, basePath: string = '/'): express.Express {
  const app = express();
  app.use(express.json());
  app.use(basePath, router);
  app.use(errorHandler);
  return app;
}

/**
 * Initialize a fresh in-memory database for testing
 * 
 * This function should be called in beforeEach hooks to ensure
 * each test starts with a clean database state.
 * 
 * @returns Promise that resolves when database is ready
 */
export async function setupTestDatabase(): Promise<void> {
  await closeDatabase();
  await getDatabase(true); // true = in-memory test database
  await runMigrations(true);
}

/**
 * Clean up database connections after tests
 * 
 * This function should be called in afterEach hooks to ensure
 * proper cleanup of database resources.
 * 
 * @returns Promise that resolves when cleanup is complete
 */
export async function teardownTestDatabase(): Promise<void> {
  await closeDatabase();
}

/**
 * Data Builders - Placeholder for future test data factories
 * 
 * These functions will help create consistent test data.
 * Expand as needed for your testing scenarios.
 */

export const TestDataBuilders = {
  /**
   * Create a supplier object with default values
   * Override any fields as needed
   */
  supplier: (overrides: Partial<any> = {}) => ({
    name: 'Test Supplier',
    description: 'Test supplier description',
    contactPerson: 'John Doe',
    email: 'john@testsupplier.com',
    phone: '555-0100',
    ...overrides,
  }),

  /**
   * Create a product object with default values
   * Override any fields as needed
   */
  product: (overrides: Partial<any> = {}) => ({
    supplierId: 1,
    name: 'Test Product',
    description: 'Test product description',
    price: 99.99,
    stockQuantity: 100,
    imageUrl: '/images/test-product.jpg',
    ...overrides,
  }),

  /**
   * Create a headquarters object with default values
   * Override any fields as needed
   */
  headquarters: (overrides: Partial<any> = {}) => ({
    name: 'Test HQ',
    description: 'Test headquarters',
    address: '123 Test St',
    contactPerson: 'Jane Smith',
    email: 'jane@testhq.com',
    phone: '555-0200',
    ...overrides,
  }),

  /**
   * Create a branch object with default values
   * Override any fields as needed
   */
  branch: (overrides: Partial<any> = {}) => ({
    headquartersId: 1,
    name: 'Test Branch',
    description: 'Test branch description',
    address: '456 Test Ave',
    contactPerson: 'Bob Johnson',
    email: 'bob@testbranch.com',
    phone: '555-0300',
    ...overrides,
  }),

  /**
   * Create an order object with default values
   * Override any fields as needed
   */
  order: (overrides: Partial<any> = {}) => ({
    branchId: 1,
    orderDate: new Date().toISOString(),
    totalAmount: 199.98,
    status: 'pending',
    notes: 'Test order notes',
    ...overrides,
  }),

  /**
   * Create an order detail object with default values
   * Override any fields as needed
   */
  orderDetail: (overrides: Partial<any> = {}) => ({
    orderId: 1,
    productId: 1,
    quantity: 2,
    unitPrice: 99.99,
    subtotal: 199.98,
    ...overrides,
  }),

  /**
   * Create a delivery object with default values
   * Override any fields as needed
   */
  delivery: (overrides: Partial<any> = {}) => ({
    supplierId: 1,
    deliveryDate: new Date().toISOString(),
    status: 'pending',
    trackingNumber: 'TEST123456',
    notes: 'Test delivery notes',
    ...overrides,
  }),

  /**
   * Create an order detail delivery object with default values
   * Override any fields as needed
   */
  orderDetailDelivery: (overrides: Partial<any> = {}) => ({
    orderDetailId: 1,
    deliveryId: 1,
    quantity: 2,
    ...overrides,
  }),
};

/**
 * Seed helper - Insert test data into the database
 * 
 * @param tableName - Name of the table to insert into
 * @param data - Data object to insert
 * @returns Promise that resolves with the inserted row ID
 */
export async function seedTestData(tableName: string, data: any): Promise<number> {
  const db = await getDatabase();
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);
  
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  const result = await db.run(sql, values);
  
  return result.lastID!;
}

/**
 * Helper to execute raw SQL for test setup
 * 
 * @param sql - SQL statement to execute
 * @param params - Optional parameters for the SQL statement
 * @returns Promise that resolves when SQL is executed
 */
export async function execTestSQL(sql: string, params: any[] = []): Promise<any> {
  const db = await getDatabase();
  return await db.run(sql, params);
}

/**
 * Helper to fetch data for test assertions
 * 
 * @param sql - SQL query to execute
 * @param params - Optional parameters for the SQL query
 * @returns Promise that resolves with the query result
 */
export async function queryTestData(sql: string, params: any[] = []): Promise<any> {
  const db = await getDatabase();
  return await db.all(sql, params);
}
