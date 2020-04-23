// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
//lowdb - end
// db.unset('books').write();
const books = db.get("books").value();

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.get("/books", (req, res) => {
  res.render("./books/index.pug", {
    books
  });
});

app.get("/books/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("books")
    .remove({ id })
    .write();
  res.redirect("/books");
});

//nếu để sau :/books/update/:id thì 
app.get("/books/update/result", (req, res) => {
  const id = parseInt(req.query.id);
  const newTitle = req.query.title;
  db.get("books")
    .find({ id })
    .assign({ title: newTitle })
    .write();
  res.render("./books/index.pug", {
    books
  });
});

app.get("/books/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateBook = books.find(book => book.id === id);
  res.render("./books/update.pug", {
    updateBook
  });
});

app.get("/books/search", (req, res) => {
  res.render("./books/search.pug");
});

app.get("/books/search/result", (req, res) => {
  const title = req.query.keyword.toLowerCase();
  const matchedBooks = books.filter(book =>
    book.title.toLowerCase().includes(title)
  );
  res.render("./books/index.pug", {
    books: matchedBooks
  });
});

app.get("/books/create", (req, res) => {
  res.render("./books/create.pug");
});

app.post("/books/create/result", (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const id = Date.parse(new Date());
  const newBook = { id, title, desc };
  db.get("books")
    .push(newBook)
    .write();
  res.render("./books/index.pug", {
    books
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
