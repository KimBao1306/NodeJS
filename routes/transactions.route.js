const express = require("express");
const route = express.Router();

const db = require("../db.js");

const transactions = db.get("transactions").value();
const users = db.get("users").value();
const books = db.get("books").value();

route.get("/", (req, res) => {
  res.render("./transactions/show.pug", {
    transactions
  });
});

route.get("/create", (req, res) => {
  res.render("./transactions/create.pug", {
    users,
    books
  });
});

route.post("/create/result", (req, res) => {
  const idBook = req.body.book;
  const idUser = req.body.user;
  const id = Date.parse(new Date());

  const newTrans = { id, idUser, idBook };
  db.get("transactions")
    .push(newTrans)
    .write();
  res.render("./transactions/show.pug", { transactions });
});

module.exports = route;
