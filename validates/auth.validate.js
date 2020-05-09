const User = require("../models/user.model.js");

module.exports.checkRegister = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || name.length > 30) {
    res.render("./auth/register.pug", {
      errors: ["Your name can not empty or more than 30 characters"],
      values: req.body
    });
    return;
  }

  if (!email) {
    res.render("./auth/register.pug", {
      errors: ["Your email can not empty"],
      values: req.body
    });
    return;
  }

  if (!password || password.length < 8) {
    res.render("./auth/register.pug", {
      errors: ["Your password need to more than 8 characters"],
      values: req.body
    });
    return;
  }
  
  const user = await User.find({email});
  
  if (user.length) {
    res.render("./auth/register.pug", {
      errors: ["Email used"],
      values: req.body
    });
    return;
  }

  next();
};

module.exports.checkLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  if (!email) {
    res.render("./auth/login.pug", {
      errors: ["Your email can not empty"],
      values: req.body
    });
    return;
  }
      
  if (!password || password.length < 8) {
    res.render("./auth/login.pug", {
      errors: ["Your password need to more than 8 characters"],
      values: req.body
    });
    return;
  }

  next();
}
