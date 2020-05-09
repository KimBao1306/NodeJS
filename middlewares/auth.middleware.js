const shortId = require("shortid");
const User = require("../models/user.model.js");
const Session = require("../models/session.model.js");

module.exports.checkLogin = async (req, res, next) => {
  if (!req.signedCookies.idUser) {
    res.redirect("/auth/login");
    return;
  }

  const user = await User.findOne({ _id: req.signedCookies.idUser });

  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;

  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (res.locals.user.isAdmin !== "admin") {
    res.render("./errors/404.pug");
    return;
  }

  next();
};

module.exports.isShop = (req, res, next) => {
  if (!["shop", "admin"].includes(res.locals.user.isAdmin)) {
    res.render("./errors/404.pug");
    return;
  }

  next();
};

module.exports.checkSession = async (req, res, next) => {
  if (!req.signedCookies.idSession) {
    const idSession = shortId.generate();

    res.cookie("idSession", idSession, { signed: true });

    Session.create({ idSession, cart: [] });
  }

  if (req.signedCookies.idUser) {
    const user = await User.findOne({ _id: req.signedCookies.idUser });

    res.locals.user = user;
  }

  next();
};
