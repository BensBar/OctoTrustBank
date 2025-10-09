/**
 * Repository for loans data access
 */

import { getDatabase, DatabaseConnection } from '../db/sqlite';
import { Loan } from '../models/loan';
import { handleDatabaseError, NotFoundError, ValidationError } from '../utils/errors';
import { objectToCamelCase } from '../utils/sql';

export class LoansRepository {
  private db: DatabaseConnection;

  constructor(db: DatabaseConnection) {
    this.db = db;
  }

  /**
   * Find loan by ID
   */
  async findById(id: number): Promise<Loan | null> {
    try {
      const row = await this.db.get<any>('SELECT * FROM loans WHERE loan_id = ?', [id]);
      return row ? (objectToCamelCase(row) as Loan) : null;
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  /**
   * Update loan approval status
   */
  async approve(
    id: number,
    approved: boolean,
    approvedBy: string,
    rejectionReason?: string,
  ): Promise<Loan> {
    try {
      // First check if loan exists and is in pending status
      const existingLoan = await this.findById(id);
      if (!existingLoan) {
        throw new NotFoundError('Loan', id);
      }

      if (existingLoan.status !== 'pending') {
        throw new ValidationError(
          `Cannot approve loan with status '${existingLoan.status}'. Only pending loans can be approved.`,
          'status',
        );
      }

      const newStatus = approved ? 'approved' : 'rejected';
      const approvalDate = new Date().toISOString();

      const updates: string[] = [];
      const params: any[] = [];

      updates.push('status = ?');
      params.push(newStatus);

      updates.push('approval_date = ?');
      params.push(approvalDate);

      updates.push('approved_by = ?');
      params.push(approvedBy);

      if (!approved && rejectionReason) {
        updates.push('rejection_reason = ?');
        params.push(rejectionReason);
      }

      params.push(id);

      const sql = `UPDATE loans SET ${updates.join(', ')} WHERE loan_id = ?`;
      const result = await this.db.run(sql, params);

      if (result.changes === 0) {
        throw new NotFoundError('Loan', id);
      }

      const updated = await this.findById(id);
      if (!updated) {
        throw new NotFoundError('Loan', id);
      }

      return updated;
    } catch (error) {
      handleDatabaseError(error);
    }
  }
}

// Factory function to create repository instance
export async function createLoansRepository(isTest: boolean = false): Promise<LoansRepository> {
  const db = await getDatabase(isTest);
  return new LoansRepository(db);
}

// Singleton instance for default usage
let loansRepo: LoansRepository | null = null;

export async function getLoansRepository(isTest: boolean = false): Promise<LoansRepository> {
  const isTestEnv = isTest || process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';
  if (isTestEnv) {
    // In tests, always return a fresh repository bound to the current in-memory DB
    return createLoansRepository(true);
  }
  if (!loansRepo) {
    loansRepo = await createLoansRepository(false);
  }
  return loansRepo;
}
