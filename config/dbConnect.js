// config/dbConnect.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connexion à la base de données MongoDB établie avec succès.');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données MongoDB :', error);
    process.exit(1); // Quitte l'application en cas d'erreur de connexion à la base de données
  }
};

module.exports = connectDB;
