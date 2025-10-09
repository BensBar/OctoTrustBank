/**
 * @swagger
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       required:
 *         - loanId
 *         - customerId
 *         - loanAmount
 *         - interestRate
 *         - termMonths
 *         - status
 *         - applicationDate
 *       properties:
 *         loanId:
 *           type: integer
 *           description: The unique identifier for the loan
 *         customerId:
 *           type: integer
 *           description: The ID of the customer applying for the loan
 *         loanAmount:
 *           type: number
 *           format: float
 *           description: The amount of the loan
 *         interestRate:
 *           type: number
 *           format: float
 *           description: Annual interest rate as a percentage
 *         termMonths:
 *           type: integer
 *           description: Loan term in months
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, disbursed, closed]
 *           description: Current status of the loan
 *         applicationDate:
 *           type: string
 *           format: date-time
 *           description: Date when the loan was applied for
 *         approvalDate:
 *           type: string
 *           format: date-time
 *           description: Date when the loan was approved or rejected
 *         approvedBy:
 *           type: string
 *           description: User who approved or rejected the loan
 *         rejectionReason:
 *           type: string
 *           description: Reason for loan rejection
 *     LoanApprovalRequest:
 *       type: object
 *       required:
 *         - loanId
 *         - approved
 *         - approvedBy
 *       properties:
 *         loanId:
 *           type: integer
 *           description: The loan ID to approve or reject
 *         approved:
 *           type: boolean
 *           description: Whether to approve or reject the loan
 *         approvedBy:
 *           type: string
 *           description: User making the approval decision
 *         rejectionReason:
 *           type: string
 *           description: Reason for rejection (required if approved is false)
 */
export interface Loan {
  loanId: number;
  customerId: number;
  loanAmount: number;
  interestRate: number;
  termMonths: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'closed';
  applicationDate: string;
  approvalDate?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface LoanApprovalRequest {
  loanId: number;
  approved: boolean;
  approvedBy: string;
  rejectionReason?: string;
}
