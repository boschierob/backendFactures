const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET - Récupérer toutes les prestations pour un client
router.get('/:customerId/prestations', async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }
    res.send(customer.prestations);
  } catch (err) {
    res.status(400).send(err);
  }
});

// POST - Ajouter une nouvelle prestation pour un client
router.post('/:customerId/add', async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }
    
    const newPrestation = req.body;
    customer.prestations.push(newPrestation);
    await customer.save();
    res.status(201).send(newPrestation);
  } catch (err) {
    res.status(400).send(err);
  }
});

// PUT - Mettre à jour une prestation existante pour un client
router.put('/:customerId/prestations/:prestationId', async (req, res) => {
  const customerId = req.params.customerId;
  const prestationId = req.params.prestationId;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    const prestation = customer.prestations.id(prestationId);
    if (!prestation) {
      return res.status(404).send({ error: "Prestation introuvable." });
    }

    Object.assign(prestation, req.body);
    await customer.save();
    res.send(prestation);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE - Supprimer une prestation pour un client
router.delete('/:customerId/prestations/:prestationId', async (req, res) => {
  const customerId = req.params.customerId;
  const prestationId = req.params.prestationId;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    const prestation = customer.prestations.id(prestationId);
    if (!prestation) {
      return res.status(404).send({ error: "Prestation introuvable." });
    }

    prestation.remove();
    await customer.save();
    res.send({ message: "Prestation supprimée avec succès." });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
