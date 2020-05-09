const express = require("express");
const multer = require("multer");

const controller = require("../controllers/books.controller.js");

const middlewareAuth = require("../middlewares/auth.middleware.js");
const middlewareBook = require("../middlewares/books.middleware.js");

const validate = require("../validates/books.validate.js");

const route = express.Router();

const upload = multer({ dest: "./public/uploads/books" });
//public
route.get("/", controller.index);

route.get("/show", controller.show);

route.get("/:idShop/show", controller.show);

route.get("/search", controller.search);

route.get("/search/result", controller.searchResult);

//private - admin or shop
route.get(
  "/create",
  middlewareAuth.checkLogin,
  middlewareAuth.isShop,
  controller.create
);

route.post(
  "/create",
  middlewareAuth.checkLogin,
  middlewareAuth.isShop,
  validate.checkCreate,
  upload.single("cover"),
  controller.createPost
);

route.get(
  "/:id/delete",
  middlewareAuth.checkLogin,
  middlewareBook.checkOwner,
  controller.delete
);

route.get(
  "/:id/update",
  middlewareAuth.checkLogin,
  middlewareBook.checkOwner,
  controller.update
);

route.post(
  "/:id/update",
  middlewareAuth.checkLogin,
  middlewareBook.checkOwner,
  validate.checkUpdate,
  controller.updatePost
);

module.exports = route;
