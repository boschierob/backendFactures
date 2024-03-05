const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// GET - Récupérer toutes les interventions pour une prestation spécifique d'un client
router.get('/:customerId/prestations/:prestationId/interventions', async (req, res) => {
  const { customerId, prestationId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    const prestation = customer.prestations.id(prestationId);
    if (!prestation) {
      return res.status(404).send({ error: "Prestation introuvable." });
    }

    res.send(prestation.interventions);
  } catch (err) {
    res.status(400).send(err);
  }
});

// POST - Ajouter une nouvelle intervention à une prestation spécifique d'un client
router.post('/:customerId/prestations/:prestationId/interventions', async (req, res) => {
  const { customerId, prestationId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    const prestation = customer.prestations.id(prestationId);
    if (!prestation) {
      return res.status(404).send({ error: "Prestation introuvable." });
    }

    const newIntervention = req.body;
    prestation.interventions.push(newIntervention);
    await customer.save();
    res.status(201).send(newIntervention);
  } catch (err) {
    res.status(400).send(err);
  }
});

// PUT - Mettre à jour une intervention existante pour une prestation spécifique d'un client
router.put('/:customerId/prestations/:prestationId/interventions/:interventionId', async (req, res) => {
  const { customerId, prestationId, interventionId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    const prestation = customer.prestations.id(prestationId);
    if (!prestation) {
      return res.status(404).send({ error: "Prestation introuvable." });
    }

    const intervention = prestation.interventions.id(interventionId);
    if (!intervention) {
      return res.status(404).send({ error: "Intervention introuvable." });
    }

    Object.assign(intervention, req.body);
    await customer.save();
    res.send(intervention);
  } catch (err) {
    res.status(400).send(err);
  }
});

// DELETE - Supprimer une intervention pour une prestation spécifique d'un client
router.delete('/:customerId/prestations/:prestationId/interventions/:interventionId', async (req, res) => {
  const { customerId, prestationId, interventionId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    const prestation = customer.prestations.id(prestationId);
    if (!prestation) {
      return res.status(404).send({ error: "Prestation introuvable." });
    }

    const intervention = prestation.interventions.id(interventionId);
    if (!intervention) {
      return res.status(404).send({ error: "Intervention introuvable." });
    }

    intervention.remove();
    await customer.save();
    res.send({ message: "Intervention supprimée avec succès." });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
