const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: String,
  wrongLoginCount: Number,
  avatarUrl: String
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;