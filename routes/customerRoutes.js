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

// CREATE POST /customers
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (err) {
    res.status(400).send(err);
  }
});

//UPDATE PUT /customers/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Chercher le client par son ID et le mettre à jour avec les données de la requête
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedCustomer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    res.send(updatedCustomer); // Renvoyer le client mis à jour
  } catch (err) {
    res.status(400).send(err); // En cas d'erreur, renvoyer une réponse d'erreur
  }
});

//DELETE DELETE /customers/:id

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Chercher le client par son ID et le supprimer
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).send({ error: "Client introuvable." });
    }

    res.send({ message: "Client supprimé avec succès." }); // Renvoyer un message de succès
  } catch (err) {
    res.status(400).send(err); // En cas d'erreur, renvoyer une réponse d'erreur
  }
});


module.exports = router;
