const express = require("express");
const controller = require("../controllers/auth.controller.js");

const route = express.Router();

route.post("/", controller.loginPost);

route.get("/logout", controller.logout);

module.exports = route;
