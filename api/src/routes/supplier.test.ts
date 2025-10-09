import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import supplierRouter from './supplier';
import { setupTestDatabase, teardownTestDatabase } from '../testUtils';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Supplier API', () => {
  beforeEach(async () => {
    await setupTestDatabase();

    // Set up express app
    app = express();
    app.use(express.json());
    app.use('/suppliers', supplierRouter);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await teardownTestDatabase();
  });

  describe('POST /suppliers', () => {
    it.todo('should create a new supplier');
    it.todo('should return 400 for invalid supplier data');
    it.todo('should return 400 for missing required fields');
  });

  describe('GET /suppliers', () => {
    it.todo('should return all suppliers');
    it.todo('should return empty array when no suppliers exist');
  });

  describe('GET /suppliers/:id', () => {
    it.todo('should return supplier by ID');
    it.todo('should return 404 for non-existent supplier');
    it.todo('should return 400 for invalid ID format');
  });

  describe('PUT /suppliers/:id', () => {
    it.todo('should update supplier by ID');
    it.todo('should return 404 for non-existent supplier');
    it.todo('should return 400 for invalid update data');
  });

  describe('DELETE /suppliers/:id', () => {
    it.todo('should delete supplier by ID');
    it.todo('should return 404 for non-existent supplier');
  });
});
