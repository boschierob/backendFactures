// customerRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer'); // Importez votre modèle de customer ici

// GET /customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /customers
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
