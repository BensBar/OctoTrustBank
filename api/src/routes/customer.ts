import express from 'express';
import { getCustomersRepository } from '../repositories/customersRepo';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: API endpoints for managing bank customers
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Returns all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *   put:
 *     summary: Update a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *   delete:
 *     summary: Delete a customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Customer ID
 *     responses:
 *       204:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */

// Create a new customer
router.post('/', async (req, res, next) => {
  try {
    const repo = await getCustomersRepository();
    const newCustomer = await repo.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    next(error);
  }
});

// Get all customers
router.get('/', async (req, res, next) => {
  try {
    const repo = await getCustomersRepository();
    const customers = await repo.findAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// Get a customer by ID
router.get('/:id', async (req, res, next) => {
  try {
    const repo = await getCustomersRepository();
    const customer = await repo.findById(parseInt(req.params.id));
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    next(error);
  }
});

// Update a customer by ID
router.put('/:id', async (req, res, next) => {
  try {
    const repo = await getCustomersRepository();
    const updatedCustomer = await repo.update(parseInt(req.params.id), req.body);
    res.json(updatedCustomer);
  } catch (error) {
    next(error);
  }
});

// Delete a customer by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const repo = await getCustomersRepository();
    await repo.delete(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Search customers by name
router.get('/search/:name', async (req, res, next) => {
  try {
    const repo = await getCustomersRepository();
    const customers = await repo.findByName(req.params.name);
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

export default router;