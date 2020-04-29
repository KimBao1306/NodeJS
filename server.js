// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const routeBooks = require("./routes/books.route.js");
const routeUsers = require("./routes/users.route.js");
const routeTransactions = require("./routes/transactions.route.js");

const app = express();
//cài view engine pug cho project express
app.set("view engine", "pug");
//thư mục chứ layout - mặc định bắt đầu bằng ./wiew
app.set("views", "./views");
//cài đặt middleware cho method post của form
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//cài đặt folder tĩnh cho 
app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("index.pug");
});
//dùng method use để thực thi các route 
app.use("/books", routeBooks);
app.use("/users", routeUsers);
app.use("/transactions", routeTransactions);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
