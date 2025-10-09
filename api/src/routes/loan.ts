import express from 'express';
import { getLoansRepository } from '../repositories/loansRepo';
import { LoanApprovalRequest } from '../models/loan';
import { ValidationError } from '../utils/errors';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: API endpoints for managing loan applications
 */

/**
 * @swagger
 * /api/loan/approve:
 *   post:
 *     summary: Approve or reject a loan application
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoanApprovalRequest'
 *           examples:
 *             approve:
 *               summary: Approve a loan
 *               value:
 *                 loanId: 1
 *                 approved: true
 *                 approvedBy: "john.doe@bank.com"
 *             reject:
 *               summary: Reject a loan
 *               value:
 *                 loanId: 1
 *                 approved: false
 *                 approvedBy: "john.doe@bank.com"
 *                 rejectionReason: "Insufficient credit score"
 *     responses:
 *       200:
 *         description: Loan approval processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Loan'
 *       400:
 *         description: Invalid request - validation error
 *       404:
 *         description: Loan not found
 *       500:
 *         description: Internal server error
 */
router.post('/approve', async (req, res, next) => {
  const startTime = Date.now();
  const requestId = `approve_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  try {
    const approvalRequest: LoanApprovalRequest = req.body;

    // Request validation with structured logging
    console.log(`[${requestId}] Processing loan approval request`, {
      loanId: approvalRequest.loanId,
      approved: approvalRequest.approved,
      approvedBy: approvalRequest.approvedBy,
      timestamp: new Date().toISOString(),
    });

    // Validate required fields
    if (!approvalRequest.loanId || typeof approvalRequest.loanId !== 'number') {
      throw new ValidationError('loanId is required and must be a number', 'loanId');
    }

    if (typeof approvalRequest.approved !== 'boolean') {
      throw new ValidationError('approved is required and must be a boolean', 'approved');
    }

    if (
      !approvalRequest.approvedBy ||
      typeof approvalRequest.approvedBy !== 'string' ||
      approvalRequest.approvedBy.trim() === ''
    ) {
      throw new ValidationError('approvedBy is required and must be a string', 'approvedBy');
    }

    // Validate rejection reason if loan is being rejected
    if (
      !approvalRequest.approved &&
      (!approvalRequest.rejectionReason || approvalRequest.rejectionReason.trim() === '')
    ) {
      throw new ValidationError(
        'rejectionReason is required when rejecting a loan',
        'rejectionReason',
      );
    }

    // Process approval
    const repo = await getLoansRepository();
    const updatedLoan = await repo.approve(
      approvalRequest.loanId,
      approvalRequest.approved,
      approvalRequest.approvedBy,
      approvalRequest.rejectionReason,
    );

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] Loan approval processed successfully`, {
      loanId: updatedLoan.loanId,
      status: updatedLoan.status,
      approvedBy: updatedLoan.approvedBy,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json(updatedLoan);
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] Loan approval failed`, {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
    next(error);
  }
});

export default router;
