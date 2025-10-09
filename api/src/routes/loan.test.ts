import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import loanRouter from './loan';
import { runMigrations } from '../db/migrate';
import { closeDatabase, getDatabase } from '../db/sqlite';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('Loan Approval API', () => {
  beforeEach(async () => {
    // Ensure a fresh in-memory database for each test
    await closeDatabase();
    await getDatabase(true);
    await runMigrations(true);

    // Seed test data
    const db = await getDatabase();

    // Insert test customer
    await db.run(
      `INSERT INTO customers (customer_id, first_name, last_name, email, customer_since, status)
       VALUES (1, 'John', 'Doe', 'john.doe@example.com', '2024-01-01', 'active')`,
      [],
    );

    // Insert test loans
    await db.run(
      `INSERT INTO loans (loan_id, customer_id, loan_amount, interest_rate, term_months, status, application_date)
       VALUES (1, 1, 50000, 5.5, 60, 'pending', '2024-01-15')`,
      [],
    );

    await db.run(
      `INSERT INTO loans (loan_id, customer_id, loan_amount, interest_rate, term_months, status, application_date)
       VALUES (2, 1, 100000, 4.5, 120, 'pending', '2024-01-16')`,
      [],
    );

    await db.run(
      `INSERT INTO loans (loan_id, customer_id, loan_amount, interest_rate, term_months, status, application_date, approval_date, approved_by)
       VALUES (3, 1, 25000, 6.0, 36, 'approved', '2024-01-17', '2024-01-18', 'admin@bank.com')`,
      [],
    );

    // Set up express app
    app = express();
    app.use(express.json());
    app.use('/loan', loanRouter);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await closeDatabase();
  });

  describe('POST /loan/approve', () => {
    it('should approve a pending loan', async () => {
      const approvalRequest = {
        loanId: 1,
        approved: true,
        approvedBy: 'john.doe@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(approvalRequest);

      expect(response.status).toBe(200);
      expect(response.body.loanId).toBe(1);
      expect(response.body.status).toBe('approved');
      expect(response.body.approvedBy).toBe('john.doe@bank.com');
      expect(response.body.approvalDate).toBeDefined();
    });

    it('should reject a pending loan with reason', async () => {
      const rejectionRequest = {
        loanId: 2,
        approved: false,
        approvedBy: 'jane.smith@bank.com',
        rejectionReason: 'Insufficient credit score',
      };

      const response = await request(app).post('/loan/approve').send(rejectionRequest);

      expect(response.status).toBe(200);
      expect(response.body.loanId).toBe(2);
      expect(response.body.status).toBe('rejected');
      expect(response.body.approvedBy).toBe('jane.smith@bank.com');
      expect(response.body.rejectionReason).toBe('Insufficient credit score');
      expect(response.body.approvalDate).toBeDefined();
    });

    it('should return 400 for missing loanId', async () => {
      const invalidRequest = {
        approved: true,
        approvedBy: 'test@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for missing approved field', async () => {
      const invalidRequest = {
        loanId: 1,
        approvedBy: 'test@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for missing approvedBy', async () => {
      const invalidRequest = {
        loanId: 1,
        approved: true,
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for rejection without reason', async () => {
      const invalidRequest = {
        loanId: 1,
        approved: false,
        approvedBy: 'test@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('rejectionReason is required');
    });

    it('should return 404 for non-existent loan', async () => {
      const approvalRequest = {
        loanId: 9999,
        approved: true,
        approvedBy: 'test@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(approvalRequest);

      expect(response.status).toBe(404);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('should return 400 when trying to approve already approved loan', async () => {
      const approvalRequest = {
        loanId: 3,
        approved: true,
        approvedBy: 'test@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(approvalRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('Only pending loans can be approved');
    });

    it('should return 400 for invalid loanId type', async () => {
      const invalidRequest = {
        loanId: 'not-a-number',
        approved: true,
        approvedBy: 'test@bank.com',
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for empty approvedBy string', async () => {
      const invalidRequest = {
        loanId: 1,
        approved: true,
        approvedBy: '',
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 400 for empty rejectionReason when rejecting', async () => {
      const invalidRequest = {
        loanId: 1,
        approved: false,
        approvedBy: 'test@bank.com',
        rejectionReason: '   ',
      };

      const response = await request(app).post('/loan/approve').send(invalidRequest);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.message).toContain('rejectionReason is required');
    });
  });
});
