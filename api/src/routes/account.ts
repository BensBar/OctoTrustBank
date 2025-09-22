import express from 'express';
import { getAccountsRepository } from '../repositories/accountsRepo';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: API endpoints for managing bank accounts
 */

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Returns all accounts
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: List of all accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *
 * /api/accounts/{id}:
 *   get:
 *     summary: Get an account by ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *   put:
 *     summary: Update an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     responses:
 *       204:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 *
 * /api/accounts/customer/{customerId}:
 *   get:
 *     summary: Get accounts by customer ID
 *     tags: [Accounts]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: List of customer accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */

// Create a new account
router.post('/', async (req, res, next) => {
  try {
    const repo = await getAccountsRepository();
    const newAccount = await repo.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
});

// Get all accounts
router.get('/', async (req, res, next) => {
  try {
    const repo = await getAccountsRepository();
    const accounts = await repo.findAll();
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

// Get an account by ID
router.get('/:id', async (req, res, next) => {
  try {
    const repo = await getAccountsRepository();
    const account = await repo.findById(parseInt(req.params.id));
    if (account) {
      res.json(account);
    } else {
      res.status(404).send('Account not found');
    }
  } catch (error) {
    next(error);
  }
});

// Get accounts by customer ID
router.get('/customer/:customerId', async (req, res, next) => {
  try {
    const repo = await getAccountsRepository();
    const accounts = await repo.findByCustomerId(parseInt(req.params.customerId));
    res.json(accounts);
  } catch (error) {
    next(error);
  }
});

// Update an account by ID
router.put('/:id', async (req, res, next) => {
  try {
    const repo = await getAccountsRepository();
    const updatedAccount = await repo.update(parseInt(req.params.id), req.body);
    res.json(updatedAccount);
  } catch (error) {
    next(error);
  }
});

// Delete an account by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const repo = await getAccountsRepository();
    await repo.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;