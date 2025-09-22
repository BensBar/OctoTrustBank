import express from 'express';
import { getTransactionsRepository } from '../repositories/transactionsRepo';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing bank transactions
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Returns all transactions
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *
 * /api/transactions/account/{accountId}:
 *   get:
 *     summary: Get transactions by account ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of transactions to return
 *     responses:
 *       200:
 *         description: List of account transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 */

// Create a new transaction
router.post('/', async (req, res, next) => {
  try {
    const repo = await getTransactionsRepository();
    const newTransaction = await repo.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
});

// Get all transactions
router.get('/', async (req, res, next) => {
  try {
    const repo = await getTransactionsRepository();
    const transactions = await repo.findAll();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

// Get a transaction by ID
router.get('/:id', async (req, res, next) => {
  try {
    const repo = await getTransactionsRepository();
    const transaction = await repo.findById(parseInt(req.params.id));
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).send('Transaction not found');
    }
  } catch (error) {
    next(error);
  }
});

// Get transactions by account ID
router.get('/account/:accountId', async (req, res, next) => {
  try {
    const repo = await getTransactionsRepository();
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const transactions = await repo.findByAccountId(parseInt(req.params.accountId), limit);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});

// Update a transaction by ID
router.put('/:id', async (req, res, next) => {
  try {
    const repo = await getTransactionsRepository();
    const updatedTransaction = await repo.update(parseInt(req.params.id), req.body);
    res.json(updatedTransaction);
  } catch (error) {
    next(error);
  }
});

// Delete a transaction by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const repo = await getTransactionsRepository();
    await repo.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;