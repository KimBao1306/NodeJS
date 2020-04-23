const express = require("express");
const controller = require("../controller/users.controller.js");

const route = express.Router();

route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/delete/:id", controller.delete);

//nếu để sau :/books/update/:id thì
route.get("/update/result", controller.updateResult);

route.get("/update/:id", controller.update);

route.get("/search", controller.search);

route.get("/search/result", controller.searchResult);

route.get("/create", controller.create);

route.post("/create/result", controller.createResult);

module.exports = route;
