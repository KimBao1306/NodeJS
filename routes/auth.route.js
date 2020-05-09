const express = require("express");
const controller = require("../controllers/auth.controller.js");

const validate = require("../validates/auth.validate.js");

const route = express.Router();
//public
route.get("/register", controller.register);

route.post("/register", validate.checkRegister, controller.registerPost);

route.get("/login", controller.login);

route.post("/login", validate.checkLogin, controller.loginPost);

route.get("/logout", controller.logout);

module.exports = route;
