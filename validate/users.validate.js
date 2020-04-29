module.exports.checkUserName = (req, res, next) => {
  const name = req.body.name;
  const errors = [];
  if (!name || name.length > 30) {
    errors.push("Your name can not empty or more than 30 characters");
    res.render("./users/create.pug", {
      errors,
      values: req.body
    });
    return;
  }
  res.locals.name = name;
  next();
};
