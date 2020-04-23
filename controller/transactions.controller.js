const db = require("../db.js");

const transactions = db.get("transactions").value();
const users = db.get("users").value();
const books = db.get("books").value();

module.exports.index = (req, res) => {
  res.render("./transactions/index.pug");
};

module.exports.show = (req, res) => {
  res.render("./transactions/show.pug", {
    transactions
  });
};

module.exports.create = (req, res) => {
  res.render("./transactions/create.pug", {
    users,
    books
  });
};

module.exports.createResult = (req, res) => {
  const idBook = req.body.book;
  const idUser = req.body.user;
  const id = Date.parse(new Date());

  const newTrans = { id, idUser, idBook };
  db.get("transactions")
    .push(newTrans)
    .write();
  res.redirect("/transactions/show");
};
