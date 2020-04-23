const express = require("express");
const route = express.Router();

const db = require("../db.js");
const books = db.get("books").value();

route.get("/", (req, res) => {
  res.render("./books/index.pug");
});

route.get("/show", (req, res) => {
  res.render("./books/show.pug", {
    books
  });
});

route.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("books")
    .remove({ id })
    .write();
  res.redirect("/books/show");
});

//nếu để sau :/books/update/:id thì
route.get("/update/result", (req, res) => {
  const id = parseInt(req.query.id);
  const newTitle = req.query.title;
  db.get("books")
    .find({ id })
    .assign({ title: newTitle })
    .write();
  res.render("./books/show.pug", {
    books
  });
});

route.get("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateBook = books.find(book => book.id === id);
  res.render("./books/update.pug", {
    updateBook
  });
});

route.get("/search", (req, res) => {
  res.render("./books/search.pug");
});

route.get("/search/result", (req, res) => {
  const title = req.query.keyword.toLowerCase();
  const matchedBooks = books.filter(book =>
    book.title.toLowerCase().includes(title)
  );
  res.render("./books/show.pug", {
    books: matchedBooks
  });
});

route.get("/create", (req, res) => {
  res.render("./books/create.pug");
});

route.post("/create/result", (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const id = Date.parse(new Date());
  const newBook = { id, title, desc };
  db.get("books")
    .push(newBook)
    .write();
  res.render("./books/show.pug", {
    books
  });
});

module.exports = route;
