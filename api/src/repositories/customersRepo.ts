/**
 * Repository for customers data access
 */

import { getDatabase, DatabaseConnection } from '../db/sqlite';
import { Customer } from '../models/customer';
import { handleDatabaseError, NotFoundError } from '../utils/errors';
import { buildInsertSQL, buildUpdateSQL, objectToCamelCase } from '../utils/sql';

export class CustomersRepository {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  /**
   * Get all customers
   */
  async findAll(): Promise<Customer[]> {
    try {
      const rows = await this.db.all<any>('SELECT * FROM customers ORDER BY customer_id');
      return rows.map((row) => objectToCamelCase(row) as Customer);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Get customer by ID
   */
  async findById(id: number): Promise<Customer | null> {
    try {
      const row = await this.db.get<any>('SELECT * FROM customers WHERE customer_id = ?', [id]);
      return row ? (objectToCamelCase(row) as Customer) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Create a new customer
   */
  async create(customer: Omit<Customer, 'customerId'>): Promise<Customer> {
    try {
      const { sql, values } = buildInsertSQL('customers', customer);
      const result = await this.db.run(sql, values);

      const createdCustomer = await this.findById(result.lastID!);
      if (!createdCustomer) {
        throw new Error('Failed to retrieve created customer');
      }

      return createdCustomer;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Update customer by ID
   */
  async update(id: number, customer: Partial<Omit<Customer, 'customerId'>>): Promise<Customer> {
    try {
      const { sql, values } = buildUpdateSQL('customers', customer, 'customer_id = ?');
      const result = await this.db.run(sql, [...values, id]);

      if (result.changes === 0) {
        throw new NotFoundError('Customer', id);
      }

      const updatedCustomer = await this.findById(id);
      if (!updatedCustomer) {
        throw new Error('Failed to retrieve updated customer');
      }

      return updatedCustomer;
    } catch (error) {
      handleDatabaseError(error, 'Customer', id);
    }
  }

  /**
   * Delete customer by ID
   */
  async delete(id: number): Promise<void> {
    try {
      const result = await this.db.run('DELETE FROM customers WHERE customer_id = ?', [id]);

      if (result.changes === 0) {
        throw new NotFoundError('Customer', id);
      }
    } catch (error) {
      handleDatabaseError(error, 'Customer', id);
    }
  }

  /**
   * Check if customer exists
   */
  async exists(id: number): Promise<boolean> {
    try {
      const row = await this.db.get<{ count: number }>(
        'SELECT COUNT(*) as count FROM customers WHERE customer_id = ?',
        [id],
      );
      return row?.count! > 0;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Find customers by name (partial match)
   */
  async findByName(name: string): Promise<Customer[]> {
    try {
      const rows = await this.db.all<any>(
        'SELECT * FROM customers WHERE first_name LIKE ? OR last_name LIKE ? ORDER BY last_name, first_name',
        [`%${name}%`, `%${name}%`],
      );
      return rows.map((row) => objectToCamelCase(row) as Customer);
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Find customer by email
   */
  async findByEmail(email: string): Promise<Customer | null> {
    try {
      const row = await this.db.get<any>('SELECT * FROM customers WHERE email = ?', [email]);
      return row ? (objectToCamelCase(row) as Customer) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}

// Factory function to create repository instance
export async function createCustomersRepository(
  isTest: boolean = false,
): Promise<CustomersRepository> {
  const db = await getDatabase(isTest);
  return new CustomersRepository(db);
}

// Singleton instance for default usage
let customersRepo: CustomersRepository | null = null;

export async function getCustomersRepository(
  isTest: boolean = false,
): Promise<CustomersRepository> {
  if (!customersRepo || isTest) {
    customersRepo = await createCustomersRepository(isTest);
  }
  return customersRepo;
}