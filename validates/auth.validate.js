const db = require("../db.js");

module.exports.checkLogin = (req, res, next) => {
  if (!req.signedCookies.idUser) {
    res.redirect("/auth/login");
    return;
  }

  const user = db
    .get("users")
    .find({ id: +req.signedCookies.idUser })
    .value();
  
  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;

  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (!res.locals.user.isAdmin) {
    res.redirect("/transactions");
    return;
  }

  next();
};
