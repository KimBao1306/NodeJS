const express = require("express");
const controller = require("../controllers/transactions.controller.js");

const route = express.Router();

route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/:id/delete", controller.delete);

route.get("/:id/update", controller.update);

route.post("/:id/update", controller.updatePost);

route.get("/create", controller.create);

route.post("/create", controller.createPost);

module.exports = route;
