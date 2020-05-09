const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  "idUser": String,
  "idBook": String,
  "isComplete": Number
})

const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');

module.exports = Transaction;