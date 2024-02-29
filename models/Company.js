// models/Company.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  telephone1: String,
  telephone2: String,
  email: String,
  web: String
});

const bankSchema = new mongoose.Schema({
  adress: String,
  logo: Buffer // Veuillez noter que le type Buffer est utilisé pour stocker des images en format binaire
});

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  representativeName: String,
  cp: String,
  city: String,
  mentionTva: String,
  tauxTva: String,
  ape: String,
  contact: {
    type: contactSchema,
    required: true
  },
  mentionsHeader: [String],
  rcs: String,
  rna: String,
  siret: String,
  activite: String,
  banques: [bankSchema]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
