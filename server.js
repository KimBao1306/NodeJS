// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const routeBooks = require("./routes/books.route.js");
const routeUser = require("./routes/user.route.js");
const routeTransaction = require("./routes/transactions.route.js");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.use("/books", routeBooks);
app.use("/user", routeUser);
app.use('/transactions', routeTransaction);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
