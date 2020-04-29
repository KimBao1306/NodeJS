const db = require("../db.js");
const books = db.get("books").value();

module.exports.index = (req, res) => {
  res.render("./books/index.pug");
};

module.exports.show = (req, res) => {
  res.render("./books/show.pug", {
    books
  });
};

module.exports.delete = (req, res) => {
  const id = +req.params.id;
  db.get("books")
    .remove({ id })
    .write();
  res.redirect("/books/show");
};

module.exports.update = (req, res) => {
  const id = +req.params.id;
  const updateBook = books.find(book => book.id === id);
  res.render("./books/update.pug", {
    updateBook
  });
};

module.exports.updatePost = (req, res) => {
  const id = +req.params.id;
  const newTitle = req.body.title;
  const newDesc = req.body.desc;
  db.get("books")
    .find({ id })
    .assign({ title: newTitle, desc: newDesc })
    .write();
  res.redirect("/books/show");
};

module.exports.search = (req, res) => {
  res.render("./books/search.pug");
};

module.exports.searchResult = (req, res) => {
  const title = req.query.keyword.toLowerCase();
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

module.exports.createPost = (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const id = Date.parse(new Date());
  const newBook = { id, title, desc };
  db.get("books")
    .push(newBook)
    .write();
  res.redirect('/books/show');
};
