const db = require("../db.js");

const transactions = db.get("transactions").value();
const users = db.get("users").value();
const books = db.get("books").value();

module.exports.index = (req, res) => {
  res.render("./transactions/index.pug");
};

module.exports.show = (req, res) => {
  res.render("./transactions/show.pug", {
    transactions,
    users,
    books
  });
};

module.exports.delete = (req, res) => {
  const id = +req.params.id;
  db.get("transactions")
    .remove({ id })
    .write();
  res.redirect("/transactions/show");
};

module.exports.update = (req, res) => {
  const id = +req.params.id;
  const updateTrans = transactions.find(t => t.id === id);
  res.render("./transactions/update.pug", {
    updateTrans
  });
};

module.exports.updatePost = (req, res) => {
  const id = +req.params.id;
  const isComplete = +req.body.isComplete;
  db.get("transactions")
    .find({ id })
    .assign({ isComplete })
    .write();
  console.log(db.get("transactions").value());
  res.redirect("/transactions/show");
};

module.exports.create = (req, res) => {
  res.render("./transactions/create.pug", {
    users,
    books
  });
};

module.exports.createPost = (req, res) => {
  const id = Date.parse(new Date());
  const idUser = +req.body.user;
  const idBook = +req.body.book;
  const isComplete = 0;
  const newTrans = { id, idUser, idBook, isComplete };
  db.get("transactions")
    .push(newTrans)
    .write();
  res.redirect("/transactions/show");
};
