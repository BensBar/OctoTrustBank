/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - accountId
 *         - customerId
 *         - accountTypeId
 *         - accountNumber
 *         - accountName
 *         - balance
 *       properties:
 *         accountId:
 *           type: integer
 *           description: The unique identifier for the account
 *         customerId:
 *           type: integer
 *           description: The ID of the customer who owns this account
 *         accountTypeId:
 *           type: integer
 *           description: The ID of the account type
 *         accountNumber:
 *           type: string
 *           description: Unique account number
 *         accountName:
 *           type: string
 *           description: Display name for the account
 *         balance:
 *           type: number
 *           format: float
 *           description: Current account balance
 *         openedDate:
 *           type: string
 *           format: date-time
 *           description: Date when the account was opened
 *         status:
 *           type: string
 *           enum: [active, closed, frozen]
 *           description: Account status
 */
export interface Account {
  accountId: number;
  customerId: number;
  accountTypeId: number;
  accountNumber: string;
  accountName: string;
  balance: number;
  openedDate: string;
  status: 'active' | 'closed' | 'frozen';
}