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

// GET - Récupérer une entreprise par son ID
router.get('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send({ error: "Entreprise introuvable." });
    }
    res.send(company);
  } catch (err) {
    res.status(400).send(err);
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

// PUT - Mettre à jour une entreprise existante
router.put('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  const customerId = req.body.customerId;
  const customerIds = req.body.customerIds;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send({ error: "Entreprise introuvable." });
    }
    
    if (customerIds && Array.isArray(customerIds)) {
      // Ajouter chaque customerId à la liste des clients s'il est défini
      company.customers.push(...customerIds);
    } else {
      // Si un seul customerId est fourni dans la requête
      const customerId = req.body.customerId;
      if (customerId) {
        company.customers.push(customerId);
      }
    }

    // Enregistrer les modifications
    const updatedCompany = await company.save();

    res.send(updatedCompany);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE - Supprimer une entreprise
router.delete('/:companyId', async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const company = await Company.findByIdAndDelete(companyId);
    if (!company) {
      return res.status(404).send({ error: "Entreprise introuvable." });
    }
    res.send({ message: "Entreprise supprimée avec succès." });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
