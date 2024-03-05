// models/Customer.js

const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  road: {
    type: String,
    required: true
  },
  number: {
    type: String
  },
  extra_info: String,
  postal_code: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: String
});

const interventionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  qty_unit: {
    type: Number,
    required: true
  },
  invoiced: {
    type: Boolean,
    default: false
  }
});

const prestationsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  unit_price: {
    type: Number,
    required: true
  },
  unit_type: {
    type: String,
    required: true
  },
  interventions: [interventionSchema]
});

const customerSchema = new mongoose.Schema({
  customer_firstname: {
    type: String,
    required: true
  },
  customer_lastname: {
    type: String,
    required: true
  },
  customer_address: {
    type: addressSchema,
    required: true
  },
  customer_telephone:{
    type: [String]
  },
  customer_telephone:{
    type: String
  },
  customer_number: String,
  prestations: [prestationsSchema],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
