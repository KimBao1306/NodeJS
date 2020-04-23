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
  res.send("I love CodersX");
});

app.get("/todos", (req, res) => {
  res.render('todos.pug', {
    todoList
  })
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
