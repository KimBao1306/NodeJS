// server.js
// where your node app starts
require("dotenv").config();
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
//dùng cookie parser để có thể đọc được nội dung trong cookie
const cookieParser = require("cookie-parser");
//sử dụng thư viện mongoose của mongodb
var mongoose = require("mongoose");
mongoose.connect(process.env.SERVER_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

const routeBooks = require("./routes/books.route.js");
const routeUsers = require("./routes/users.route.js");
const routeTransactions = require("./routes/transactions.route.js");
const routeAuth = require("./routes/auth.route.js");
const routeProfile = require("./routes/profile.route.js");
const routeCart = require("./routes/cart.route.js");
const routeShop = require("./routes/shop.route.js");

const middlewareAuth = require("./middlewares/auth.middleware.js");
//API
const routeTransactionsAPI = require("./api/routes/transactions.route.js");
const routeAuthAPI = require("./api/routes/auth.route.js");

const middlewareAuthAPI = require("./api/middlewares/auth.middleware.js");

const app = express();

//cài view engine pug cho project express
app.set("view engine", "pug");
//thư mục chứ layout - mặc định bắt đầu bằng ./wiew
app.set("views", "./views");

//cài đặt middleware cho method post của form
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//cài đặt middleware cho cookie, với chuỗi secret
app.use(cookieParser(process.env.COOKIE_ID));

app.use(middlewareAuth.checkSession);

//cài đặt folder tĩnh cho các file css, img, js
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/books");
});

//dùng method use để thực thi các route
//admin
app.use(
  "/users",
  middlewareAuth.checkLogin,
  middlewareAuth.isAdmin,
  routeUsers
);

app.use("/books", routeBooks);
app.use("/cart", routeCart);
app.use("/auth", routeAuth);

app.use("/transactions", middlewareAuth.checkLogin, routeTransactions);
app.use("/profile", middlewareAuth.checkLogin, routeProfile);
app.use("/shop", middlewareAuth.checkLogin, routeShop);

//route dành cho API
app.use(
  "/api/transactions",
  middlewareAuthAPI.checkLogin,
  routeTransactionsAPI
);
app.use("/api/auth", routeAuthAPI);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
