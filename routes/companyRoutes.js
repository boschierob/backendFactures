// companyRoutes.js

const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET /companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST /companies
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).send(company);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
