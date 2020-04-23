// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

app.set('view engines', 'pug');
app.set('views', './views')

const todoList = ['Đi chợ', 'Nấu cơm', 'Rửa bát', 'Học code tại CodersX'];

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render('index.pug');
});

app.get("/todos", (req, res) => {
  res.render('./todos/index.pug', {
    todoList
  })
})

app.get("/todos/search", (req, res) => {
  const qValue = req.query.q.toLowerCase();
  const newTodoList = todoList.filter(item => item.toLowerCase().includes(qValue));
  res.render('./todos/search.pug', {
    newTodoList
  })
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
