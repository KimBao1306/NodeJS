const express = require("express");
const controller = require("../controller/books.controller.js");

const route = express.Router();

route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/:id/delete", controller.delete);

route.get("/:id/update", controller.update);

route.post("/:id/update", controller.updatePost);

route.get("/search", controller.search);

route.get("/search/result", controller.searchResult);

route.get("/create", controller.create);

route.post("/create", controller.createPost);

module.exports = route;
