/**
 * Repository for accounts data access
 */

import { getDatabase, DatabaseConnection } from '../db/sqlite';
import { Account } from '../models/account';
import { handleDatabaseError, NotFoundError } from '../utils/errors';
import { buildInsertSQL, buildUpdateSQL, objectToCamelCase } from '../utils/sql';

export class AccountsRepository {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  /**
   * Get all accounts
   */
  async findAll(): Promise<Account[]> {
    try {
      const rows = await this.db.all<any>('SELECT * FROM accounts ORDER BY account_id');
      return rows.map((row) => objectToCamelCase(row) as Account);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get account by ID
   */
  async findById(id: number): Promise<Account | null> {
    try {
      const row = await this.db.get<any>('SELECT * FROM accounts WHERE account_id = ?', [id]);
      return row ? (objectToCamelCase(row) as Account) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get accounts by customer ID
   */
  async findByCustomerId(customerId: number): Promise<Account[]> {
    try {
      const rows = await this.db.all<any>(
        'SELECT * FROM accounts WHERE customer_id = ? ORDER BY account_id',
        [customerId],
      );
      return rows.map((row) => objectToCamelCase(row) as Account);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get account by account number
   */
  async findByAccountNumber(accountNumber: string): Promise<Account | null> {
    try {
      const row = await this.db.get<any>('SELECT * FROM accounts WHERE account_number = ?', [
        accountNumber,
      ]);
      return row ? (objectToCamelCase(row) as Account) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Create a new account
   */
  async create(account: Omit<Account, 'accountId'>): Promise<Account> {
    try {
      const { sql, values } = buildInsertSQL('accounts', account);
      const result = await this.db.run(sql, values);

      const createdAccount = await this.findById(result.lastID!);
      if (!createdAccount) {
        throw new Error('Failed to retrieve created account');
      }

      return createdAccount;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Update account by ID
   */
  async update(id: number, account: Partial<Omit<Account, 'accountId'>>): Promise<Account> {
    try {
      const { sql, values } = buildUpdateSQL('accounts', account, 'account_id = ?');
      const result = await this.db.run(sql, [...values, id]);

      if (result.changes === 0) {
        throw new NotFoundError('Account', id);
      }

      const updatedAccount = await this.findById(id);
      if (!updatedAccount) {
        throw new Error('Failed to retrieve updated account');
      }

      return updatedAccount;
    } catch (error) {
      handleDatabaseError(error, 'Account', id);
    }
  }

  /**
   * Update account balance
   */
  async updateBalance(id: number, newBalance: number): Promise<Account> {
    try {
      const result = await this.db.run('UPDATE accounts SET balance = ? WHERE account_id = ?', [newBalance, id]);

      if (result.changes === 0) {
        throw new NotFoundError('Account', id);
      }

      const updatedAccount = await this.findById(id);
      if (!updatedAccount) {
        throw new Error('Failed to retrieve updated account');
      }

      return updatedAccount;
    } catch (error) {
      handleDatabaseError(error, 'Account', id);
    }
  }

  /**
   * Delete account by ID
   */
  async delete(id: number): Promise<void> {
    try {
      const result = await this.db.run('DELETE FROM accounts WHERE account_id = ?', [id]);

      if (result.changes === 0) {
        throw new NotFoundError('Account', id);
      }
    } catch (error) {
      handleDatabaseError(error, 'Account', id);
    }
  }

  /**
   * Check if account exists
   */
  async exists(id: number): Promise<boolean> {
    try {
      const row = await this.db.get<{ count: number }>(
        'SELECT COUNT(*) as count FROM accounts WHERE account_id = ?',
        [id],
      );
      return row?.count! > 0;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}

// Factory function to create repository instance
export async function createAccountsRepository(isTest: boolean = false): Promise<AccountsRepository> {
  const db = await getDatabase(isTest);
  return new AccountsRepository(db);
}

// Singleton instance for default usage
let accountsRepo: AccountsRepository | null = null;

export async function getAccountsRepository(isTest: boolean = false): Promise<AccountsRepository> {
  if (!accountsRepo || isTest) {
    accountsRepo = await createAccountsRepository(isTest);
  }
  return accountsRepo;
}