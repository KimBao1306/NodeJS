const db = require("../db.js");
const users = db.get("users").value();

module.exports.checkCreate = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || name.length > 30) {
    res.render("./users/create.pug", {
      errors: ["Your name can not empty or more than 30 characters"],
      values: req.body
    });
    return;
  }

  if (!email) {
    res.render("./users/create.pug", {
      errors: ["Your email can not empty"],
      values: req.body
    });
    return;
  }

  if (!password || password.length < 8) {
    res.render("./users/create.pug", {
      errors: ["Your password need to more than 8 characters"],
      values: req.body
    });
    return;
  }

  if (users.some(u => u.email === email)) {
    res.render("./users/create.pug", {
      errors: ["Email used"],
      values: req.body
    });
    return;
  }

  res.locals.u = req.body;

  next();
};
