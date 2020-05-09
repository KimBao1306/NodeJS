const shortId = require("shortid");
const Transaction = require("../models/transaction.model.js");
const User = require("../models/user.model.js");
const Book = require("../models/book.model.js");
const Session = require("../models/session.model.js");

module.exports.index = (req, res) => {
  res.render("./transactions/index.pug");
};

module.exports.show = async (req, res) => {
  const transactionsP =
    res.locals.user.isAdmin === "admin"
      ? Transaction.find()
      : Transaction.find({ idUser: req.signedCookies.idUser });
  const userP = User.find({ _id: req.signedCookies.idUser });
  const booksP = Book.find();

  const user = await userP;
  const books = await booksP;
  const transactionsById = await transactionsP;

  res.render("./transactions/show.pug", {
    transactionsById,
    users: user,
    books
  });
};

module.exports.delete = async (req, res) => {
  const _id = req.params.id;

  await Transaction.deleteOne({ _id });

  res.redirect("/Transactions/show");
};

module.exports.update = async (req, res) => {
  const _id = req.params.id;

  const updateTrans = await Transaction.findOne({ _id });

  if (!updateTrans) {
    res.render("./errors/404.pug");
    return;
  }

  res.render("./transactions/update.pug", {
    updateTrans
  });
};

module.exports.updatePost = async (req, res) => {
  const _id = req.params.id;
  const isComplete = +req.body.isComplete;

  await Transaction.updateOne({ _id }, { isComplete });
  
  res.redirect("/transactions/show")
};

module.exports.create = async (req, res) => {
  const userP = User.find({ _id: req.signedCookies.idUser });
  const booksP = Book.find();

  const user = await userP;
  const books = await booksP;

  res.render("./transactions/create.pug", {
    users: user,
    books
  });
};

module.exports.createPost = async (req, res) => {
  const idUser = req.body.user;
  const idBook = req.body.book;
  const isComplete = 0;

  await Transaction.create({ idUser, idBook, isComplete })
  
  res.redirect("/transactions/show")
};

module.exports.createInCart = async (req, res, next) => {
  const cart = await Session.findOne({
    idSession: req.signedCookies.idSession
  });

  if (!cart.cart.length) {
    res.redirect("/books/show");
    return;
  }

  for (let idBook of cart.cart) {
    const idUser = req.signedCookies.idUser;
    const isComplete = 0;

    Transaction.create({ idUser, idBook, isComplete });
  }

  res.clearCookie("idSession");

  res.redirect("/transactions/show");
};
