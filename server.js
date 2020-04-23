// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// lowdb
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ todos: ["Học code tại CodersX"] }).write();
// lowdb-end

app.set("view engines", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index.pug");
});

const todoList = db.get("todos").value();

app.get("/todos", (req, res) => {
  res.render("./todos/index.pug", {
    todoList
  });
});

app.get("/todos/search", (req, res) => {
  const qValue = req.query.q.toLowerCase();
  const newTodoList = todoList.filter(item => item.toLowerCase().includes(qValue));
  res.render("./todos/search.pug", {
    newTodoList
  });
});

app.post("/todos/create", (req, res) => {
  const value = req.body.todo;
  db.get("todos")
    .push(value)
    .write();
  res.redirect("/todos");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
