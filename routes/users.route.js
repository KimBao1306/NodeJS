const express = require("express");
const controller = require("../controllers/users.controller.js");
const validate = require("../validates/auth.validate.js");

const route = express.Router();
//private - only admin
route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/:id/delete", controller.delete);

route.get("/:id/update", controller.update);

route.post("/:id/update", controller.updatePost);

route.get("/search", controller.search);

route.get("/search/result", controller.searchResult);

route.get("/create", controller.create);

route.post("/create", validate.checkRegister, controller.createPost);

module.exports = route;
