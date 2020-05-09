const shortId = require("shortid");
const Session = require("../models/session.model.js");
const Book = require("../models/book.model.js");

module.exports.index = async (req, res) => {
  const cartP = Session.findOne({ idSession: req.signedCookies.idSession });
  const booksP = Book.find();

  const cart = await cartP;
  const books = await booksP;

  res.render("./cart/index.pug", {
    cart: cart.cart,
    books
  });
};

module.exports.add = async (req, res) => {
  const idSession = req.signedCookies.idSession;
  const idBook = req.params.idBook;
  const page = req.query.page || 1;

  if (!idSession) {
    res.redirect("/books/show");
    return;
  }

  await Session.findOneAndUpdate(
    { idSession },
    {$addToSet: { cart: idBook }}
  );

  res.redirect(`/books/show`);
};
