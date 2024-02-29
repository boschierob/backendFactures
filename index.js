// index.js

require('dotenv').config();

const { app, PORT } = require('./server'); // Importez l'application Express et le port du serveur

const connectDB = require('./config/dbConnect'); // Importez la fonction de connexion à la base de données



// Appels à la fonction de connexion à la base de données
connectDB();

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
