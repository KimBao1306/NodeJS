const express = require("express");

const controller = require("../controllers/shop.controller.js");

const route = express.Router();
//public - need to login
route.get("/", controller.index);

module.exports = route;



