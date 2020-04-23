const express = require("express");
const route = express.Router();

const db = require("../db.js");
const users = db.get("users").value();

route.get("/", (req, res) => {
  res.render("./user/index.pug");
});

route.get("/show", (req, res) => {
  res.render("./user/show.pug", {
    users
  });
});

route.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("users")
    .remove({ id })
    .write();
  res.redirect("/user/show");
});

//nếu để sau :/books/update/:id thì
route.get("/update/result", (req, res) => {
  const id = parseInt(req.query.id);
  const newName = req.query.name;
  db.get("users")
    .find({ id })
    .assign({ name: newName })
    .write();
  res.render("./user/show.pug", {
    users
  });
});

route.get("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = users.find(u => u.id === id);
  res.render("./user/update.pug", {
    updateUser
  });
});

route.get("/search", (req, res) => {
  res.render("./user/search.pug");
});

route.get("/search/result", (req, res) => {
  const name = req.query.name.toLowerCase();
  const matchedUsers = users.filter(u => u.name.toLowerCase().includes(name));
  res.render("./user/show.pug", {
    users: matchedUsers
  });
});

route.get("/create", (req, res) => {
  res.render("./user/create.pug");
});

route.post("/create/result", (req, res) => {
  const name = req.body.name;
  const id = Date.parse(new Date());
  const newUser = { id, name };
  db.get("users")
    .push(newUser)
    .write();
  res.render("./user/show.pug", {
    users
  });
});

module.exports = route;
