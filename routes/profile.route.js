const express = require("express");
const multer = require("multer");

const controller = require("../controllers/profile.controller.js");

const route = express.Router();

const upload = multer({ dest: "./public/uploads/users" });
//public - need to login
route.get("/", controller.index);

route.post("/:id", upload.single("avatar"), controller.updateProfile);

module.exports = route;
