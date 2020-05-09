const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  "title": String,
  "desc": String,
  "shop": {
    "type": Object,
    "idUser": String,
    "name": String
  },  
  "coverUrl": String
})

const Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;