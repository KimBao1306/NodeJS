const db = require("../db.js");

module.exports.checkLogin = (req, res, next) => {
  if (!req.cookies.idUser) {
    res.redirect("/auth/login");
    return;
  }

  const user = db
    .get("users")
    .find({ id: +req.cookies.idUser })
    .value();

  if (!user) {
    res.redirect("/auth/login");
    return;
  }
  
  res.locals.isAdmin = user.isAdmin;
  
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if(!res.locals.isAdmin) {
    res.redirect('/transactions');
    return;
  }
  
  next();
};
