const Book = require("../models/book.model.js");

module.exports.checkOwner = async (req, res, next) => {
  const books = await Book.find({ "shop.idShop": res.locals.user.id });
  const idBooks = books.map(book => book.id)
  const idBook = req.params.id;
  
  if(!idBooks.includes(idBook)) {
    res.render('./errors/404.pug');
    return;
  }

  next();
};
