// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const db = require('./db.js');

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index.pug");
});

//books
const books = db.get("books").value();

app.get("/books", (req, res) => {
  res.render("./books/index.pug");
});

app.get("/books/show", (req, res) => {
  res.render("./books/show.pug", {
    books
  });
});

app.get("/books/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("books")
    .remove({ id })
    .write();
  res.redirect("/books/show");
});

//nếu để sau /books/update/:id thì sẽ bị :id thực thi trước
app.get("/books/update/result", (req, res) => {
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
  res.render("./books/show.pug", {
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
  res.render("./books/show.pug", {
    books
  });
});
//books-end

//user
const users = db.get("users").value();

app.get("/user", (req, res) => {
  res.render("./user/index.pug");
});

app.get("/user/show", (req, res) => {
  res.render("./user/show.pug", {
    users
  });
});

app.get("/user/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.get("users")
    .remove({ id })
    .write();
  res.redirect("/user/show");
});

app.get("/user/update/result", (req, res) => {
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

app.get("/user/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = users.find(u => u.id === id);
  res.render("./user/update.pug", {
    updateUser
  });
});

app.get("/user/search", (req, res) => {
  res.render("./user/search.pug");
});

app.get("/user/search/result", (req, res) => {
  const name = req.query.name.toLowerCase();
  const matchedUsers = users.filter(u => u.name.toLowerCase().includes(name));
  res.render("./user/show.pug", {
    users: matchedUsers
  });
});

app.get("/user/create", (req, res) => {
  res.render("./user/create.pug");
});

app.post("/user/create/result", (req, res) => {
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
//user-end


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
