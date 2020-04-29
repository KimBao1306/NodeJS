// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
//dùng cookie parser để có thể đọc được nội dung trong cookie
const cookieParser = require("cookie-parser");
const routeBooks = require("./routes/books.route.js");
const routeUsers = require("./routes/users.route.js");
const routeTransactions = require("./routes/transactions.route.js");
const routeAuth = require("./routes/auth.route.js");

const validateAuth = require("./validates/auth.validate.js");

const app = express();

//cài view engine pug cho project express
app.set("view engine", "pug");

//thư mục chứ layout - mặc định bắt đầu bằng ./wiew
app.set("views", "./views");

//cài đặt middleware cho method post của form
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//cài đặt middleware cho cookie
app.use(cookieParser());

//cài đặt folder tĩnh cho các file css, img, js
app.use(express.static("public"));

app.get("/", validateAuth.checkLogin, (req, res) => {
  if(!res.locals.isAdmin) {
    res.redirect('/transactions');
  } else {
    res.redirect('/books');
  }
});

//dùng method use để thực thi các route
app.use("/books", validateAuth.checkLogin, validateAuth.isAdmin, routeBooks);
app.use("/users", validateAuth.checkLogin, validateAuth.isAdmin, routeUsers);
app.use("/transactions", validateAuth.checkLogin, routeTransactions);
app.use("/auth", routeAuth);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
