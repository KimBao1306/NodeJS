const express = require("express");
const controller = require("../controllers/auth.controller.js");

const route = express.Router();

route.get("/login", controller.login);

route.post("/login", controller.loginPost);

module.exports = route;
