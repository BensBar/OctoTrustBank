/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - transactionId
 *         - accountId
 *         - transactionTypeId
 *         - amount
 *         - transactionDate
 *       properties:
 *         transactionId:
 *           type: integer
 *           description: The unique identifier for the transaction
 *         accountId:
 *           type: integer
 *           description: The ID of the account this transaction belongs to
 *         transactionTypeId:
 *           type: integer
 *           description: The ID of the transaction type
 *         amount:
 *           type: number
 *           format: float
 *           description: Transaction amount (positive for credits, negative for debits)
 *         description:
 *           type: string
 *           description: Description of the transaction
 *         transactionDate:
 *           type: string
 *           format: date-time
 *           description: Date and time of the transaction
 *         status:
 *           type: string
 *           enum: [pending, completed, failed, cancelled]
 *           description: Transaction status
 *         referenceNumber:
 *           type: string
 *           description: Unique reference number for the transaction
 *         relatedTransactionId:
 *           type: integer
 *           description: ID of related transaction (for transfers)
 */
export interface Transaction {
  transactionId: number;
  accountId: number;
  transactionTypeId: number;
  amount: number;
  description?: string;
  transactionDate: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  referenceNumber?: string;
  relatedTransactionId?: number;
}