/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionType:
 *       type: object
 *       required:
 *         - transactionTypeId
 *         - typeName
 *       properties:
 *         transactionTypeId:
 *           type: integer
 *           description: The unique identifier for the transaction type
 *         typeName:
 *           type: string
 *           description: Name of the transaction type
 *         description:
 *           type: string
 *           description: Description of the transaction type
 *         requiresApproval:
 *           type: boolean
 *           description: Whether this transaction type requires approval
 */
export interface TransactionType {
  transactionTypeId: number;
  typeName: string;
  description?: string;
  requiresApproval: boolean;
}