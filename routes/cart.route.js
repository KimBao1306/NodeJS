const express = require('express');

const controller = require('../controllers/cart.controller.js');

const route = express.Router();
//public - need to login
route.get('/', controller.index);

route.get('/add/:idBook', controller.add)

module.exports = route;