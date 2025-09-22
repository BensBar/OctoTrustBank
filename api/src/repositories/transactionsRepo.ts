/**
 * Repository for transactions data access
 */

import { getDatabase, DatabaseConnection } from '../db/sqlite';
import { Transaction } from '../models/transaction';
import { handleDatabaseError, NotFoundError } from '../utils/errors';
import { buildInsertSQL, buildUpdateSQL, objectToCamelCase } from '../utils/sql';

export class TransactionsRepository {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  /**
   * Get all transactions
   */
  async findAll(): Promise<Transaction[]> {
    try {
      const rows = await this.db.all<any>('SELECT * FROM transactions ORDER BY transaction_date DESC');
      return rows.map((row) => objectToCamelCase(row) as Transaction);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get transaction by ID
   */
  async findById(id: number): Promise<Transaction | null> {
    try {
      const row = await this.db.get<any>('SELECT * FROM transactions WHERE transaction_id = ?', [id]);
      return row ? (objectToCamelCase(row) as Transaction) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get transactions by account ID
   */
  async findByAccountId(accountId: number, limit?: number): Promise<Transaction[]> {
    try {
      const limitClause = limit ? `LIMIT ${limit}` : '';
      const rows = await this.db.all<any>(
        `SELECT * FROM transactions WHERE account_id = ? ORDER BY transaction_date DESC ${limitClause}`,
        [accountId],
      );
      return rows.map((row) => objectToCamelCase(row) as Transaction);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get transactions by reference number
   */
  async findByReferenceNumber(referenceNumber: string): Promise<Transaction | null> {
    try {
      const row = await this.db.get<any>(
        'SELECT * FROM transactions WHERE reference_number = ?',
        [referenceNumber],
      );
      return row ? (objectToCamelCase(row) as Transaction) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get transactions by date range
   */
  async findByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    try {
      const rows = await this.db.all<any>(
        'SELECT * FROM transactions WHERE transaction_date >= ? AND transaction_date <= ? ORDER BY transaction_date DESC',
        [startDate, endDate],
      );
      return rows.map((row) => objectToCamelCase(row) as Transaction);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Create a new transaction
   */
  async create(transaction: Omit<Transaction, 'transactionId'>): Promise<Transaction> {
    try {
      const { sql, values } = buildInsertSQL('transactions', transaction);
      const result = await this.db.run(sql, values);

      const createdTransaction = await this.findById(result.lastID!);
      if (!createdTransaction) {
        throw new Error('Failed to retrieve created transaction');
      }

      return createdTransaction;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Update transaction by ID
   */
  async update(id: number, transaction: Partial<Omit<Transaction, 'transactionId'>>): Promise<Transaction> {
    try {
      const { sql, values } = buildUpdateSQL('transactions', transaction, 'transaction_id = ?');
      const result = await this.db.run(sql, [...values, id]);

      if (result.changes === 0) {
        throw new NotFoundError('Transaction', id);
      }

      const updatedTransaction = await this.findById(id);
      if (!updatedTransaction) {
        throw new Error('Failed to retrieve updated transaction');
      }

      return updatedTransaction;
    } catch (error) {
      handleDatabaseError(error, 'Transaction', id);
    }
  }

  /**
   * Delete transaction by ID
   */
  async delete(id: number): Promise<void> {
    try {
      const result = await this.db.run('DELETE FROM transactions WHERE transaction_id = ?', [id]);

      if (result.changes === 0) {
        throw new NotFoundError('Transaction', id);
      }
    } catch (error) {
      handleDatabaseError(error, 'Transaction', id);
    }
  }

  /**
   * Check if transaction exists
   */
  async exists(id: number): Promise<boolean> {
    try {
      const row = await this.db.get<{ count: number }>(
        'SELECT COUNT(*) as count FROM transactions WHERE transaction_id = ?',
        [id],
      );
      return row?.count! > 0;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get account balance by summing all transactions
   */
  async getAccountBalance(accountId: number): Promise<number> {
    try {
      const row = await this.db.get<{ balance: number }>(
        'SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE account_id = ? AND status = "completed"',
        [accountId],
      );
      return row?.balance || 0;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}

// Factory function to create repository instance
export async function createTransactionsRepository(isTest: boolean = false): Promise<TransactionsRepository> {
  const db = await getDatabase(isTest);
  return new TransactionsRepository(db);
}

// Singleton instance for default usage
let transactionsRepo: TransactionsRepository | null = null;

export async function getTransactionsRepository(isTest: boolean = false): Promise<TransactionsRepository> {
  if (!transactionsRepo || isTest) {
    transactionsRepo = await createTransactionsRepository(isTest);
  }
  return transactionsRepo;
}