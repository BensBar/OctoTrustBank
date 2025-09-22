/**
 * @swagger
 * components:
 *   schemas:
 *     AccountType:
 *       type: object
 *       required:
 *         - accountTypeId
 *         - typeName
 *       properties:
 *         accountTypeId:
 *           type: integer
 *           description: The unique identifier for the account type
 *         typeName:
 *           type: string
 *           description: Name of the account type (checking, savings, etc.)
 *         description:
 *           type: string
 *           description: Description of the account type
 *         interestRate:
 *           type: number
 *           format: float
 *           description: Annual interest rate as a decimal
 *         minimumBalance:
 *           type: number
 *           format: float
 *           description: Minimum balance required
 *         monthlyFee:
 *           type: number
 *           format: float
 *           description: Monthly maintenance fee
 *         transactionLimit:
 *           type: integer
 *           description: Monthly transaction limit (-1 for unlimited)
 *         overdraftAllowed:
 *           type: boolean
 *           description: Whether overdrafts are allowed
 */
export interface AccountType {
  accountTypeId: number;
  typeName: string;
  description?: string;
  interestRate: number;
  minimumBalance: number;
  monthlyFee: number;
  transactionLimit: number;
  overdraftAllowed: boolean;
}