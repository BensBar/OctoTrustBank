import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import deliveryRouter from './delivery';
import { setupTestDatabase, teardownTestDatabase } from '../testUtils';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Delivery API', () => {
  beforeEach(async () => {
    await setupTestDatabase();

    // Set up express app
    app = express();
    app.use(express.json());
    app.use('/deliveries', deliveryRouter);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await teardownTestDatabase();
  });

  describe('POST /deliveries', () => {
    it.todo('should create a new delivery');
    it.todo('should return 400 for invalid delivery data');
    it.todo('should return 400 for missing required fields');
  });

  describe('GET /deliveries', () => {
    it.todo('should return all deliveries');
    it.todo('should return empty array when no deliveries exist');
  });

  describe('GET /deliveries/:id', () => {
    it.todo('should return delivery by ID');
    it.todo('should return 404 for non-existent delivery');
    it.todo('should return 400 for invalid ID format');
  });

  describe('PUT /deliveries/:id', () => {
    it.todo('should update delivery by ID');
    it.todo('should return 404 for non-existent delivery');
    it.todo('should return 400 for invalid update data');
  });

  describe('DELETE /deliveries/:id', () => {
    it.todo('should delete delivery by ID');
    it.todo('should return 404 for non-existent delivery');
  });
});
