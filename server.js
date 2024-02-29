// server.js

const express = require('express');
const connectDB = require('./config/dbConnect'); // Importez la fonction de connexion à la base de données
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le corps des requêtes
app.use(express.json());

//cors policy
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  

// Utiliser les routes de client
app.use('/customers', require('./routes/customerRoutes'));

// Utiliser les routes de l'entreprise
app.use('/companies', require('./routes/companyRoutes'));

module.exports = { app, PORT };
