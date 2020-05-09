const express = require("express");
const controller = require("../controllers/transactions.controller.js");

const middleware = require("../middlewares/auth.middleware.js");

const route = express.Router();

route.get("/", controller.index);

route.get("/:id/delete", middleware.isAdmin, controller.delete);

route.post("/:id/update",  middleware.isAdmin, controller.updatePost);

route.post("/create", controller.createPost);

// route.get("/createInCart", controller.createInCart);

module.exports = route;
