const express = require("express");
const controller = require("../controllers/transactions.controller.js");

const middlewareAuth = require("../middlewares/auth.middleware.js");

const route = express.Router();
//public - need to login
route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/createInCart", controller.createInCart);
//private - only admin
route.get("/:id/delete", middlewareAuth.isAdmin, controller.delete);

route.get("/:id/update", middlewareAuth.isAdmin, controller.update);

route.post("/:id/update", middlewareAuth.isAdmin, controller.updatePost);

route.get("/create", middlewareAuth.isAdmin, controller.create);

route.post("/create", middlewareAuth.isAdmin, controller.createPost);

module.exports = route;
