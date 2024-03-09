// customerRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Company = require('../models/Company');


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
  console.log('enter the route create customer');
  try {
    const customer = new Customer(req.body);
    await customer.save();
     // Récupérer l'ID de l'entreprise associée au nouveau client
     const companyId = customer.company;

     // Mettre à jour l'entreprise correspondante pour ajouter l'ID du nouveau client à sa liste de clients
     await Company.findByIdAndUpdate(
       companyId,
       { $addToSet: { customers: customer._id } }, // Utiliser $addToSet pour éviter les doublons
       { new: true }
     );
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
