const cloudinary = require("cloudinary").v2;

const Book = require("../models/book.model.js");

module.exports.index = (req, res) => {
  res.render("./books/index.pug");
};

module.exports.show = async (req, res) => {
  const booksP = req.params.idShop
    ? Book.find({ "shop.idShop": req.params.idShop })
    : Book.find();

  const books = await booksP;

  res.render("./books/show.pug", {
    books,
    title: "Library"
  });
};

module.exports.delete = async (req, res) => {
  const _id = req.params.id;

  await Book.deleteOne({ _id });

  res.redirect(`/books/${res.locals.user.id}/show`);
};

module.exports.update = async (req, res) => {
  const _id = req.params.id;

  const updateBook = await Book.findOne({ _id });

  res.render("./books/update.pug", {
    updateBook
  });
};

module.exports.updatePost = async (req, res) => {
  const _id = req.params.id;
  const newTitle = req.body.title;
  const newDesc = req.body.desc;

  await Book.updateOne({ _id }, { title: newTitle, desc: newDesc });

  res.redirect(`/books/${res.locals.user.id}/show`);
};

module.exports.search = (req, res) => {
  res.render("./books/search.pug");
};

module.exports.searchResult = async (req, res) => {
  const title = req.query.keyword.toLowerCase();

  const books = await Book.find();

  const matchedBooks = books.filter(book =>
    book.title.toLowerCase().includes(title)
  );

  res.render("./books/show.pug", {
    books: matchedBooks
  });
};

module.exports.create = (req, res) => {
  res.render("./books/create.pug");
};

module.exports.createPost = async (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const shop = { idShop: res.locals.user.id, name: res.locals.user.name };

  let coverUrl =
    "https://res.cloudinary.com/bao-codersx/image/upload/v1588414918/coverBook_rhne73.jpg";

  if (req.file) {
    const path = req.file.path;

    const cloud = await cloudinary.uploader.upload(`./${path}`);

    coverUrl = cloud.url;
  }

  await Book.create({ title, desc, shop, coverUrl });

  res.redirect(`/books/${res.locals.user.id}/show`);
};
