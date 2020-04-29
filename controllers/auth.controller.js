const md5 = require("md5");

const db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("./auth/login.pug");
};

module.exports.loginPost = (req, res) => {
  const emailUser = req.body.email;
  const passwordUser = md5(req.body.password);

  const user = db
    .get("users")
    .find({ email: emailUser })
    .value();

  if (!user) {
    res.render("./auth/login.pug", {
      errors: ["Can not find your account. Please try again"],
      values: req.body
    });
    return;
  }

  if (passwordUser !== user.password) {
    res.render("./auth/login.pug", {
      errors: ["Your email or password were wrong. Please try again"],
      values: req.body
    });
    return;
  }

  res.cookie("idUser", user.id);

  res.redirect("/");
};
