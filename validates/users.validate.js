const db = require("../db.js");

module.exports.checkCreate = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email
  
  if (!name || name.length > 30) {
    res.render("./users/create.pug", {
      errors: [
        "Your name can not empty or more than 30 characters"
      ],
      values: req.body
    });
    return;
  }
  
  if (!email) {
    res.render("./users/create.pug", {
      errors: [
        "Your email can not empty"
      ],
      values: req.body
    });
    return;
  }
  
  res.locals.u = req.body;
  
  next();
};
