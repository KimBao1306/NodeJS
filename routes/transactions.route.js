const express = require("express");
const controller = require("../controller/transactions.controller.js");

const route = express.Router();

route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/create", controller.create);

route.post("/create/result", controller.createResult);

module.exports = route;
