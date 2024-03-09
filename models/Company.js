// models/Company.js

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  telephone1: String,
  telephone2: String,
  email: String,
  web: String
});

const bankSchema = new mongoose.Schema({
  bank_name: String,
  adress: String,
  name_proprietaire: String,
  iban: String,
  bic: String,
  code_banque: String,
  code_guichet: String,
  numero_compte: String,
  cle: String,
  escompte_message: String,

});

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  logo: Buffer,
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
  banques: [bankSchema],
  customers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
