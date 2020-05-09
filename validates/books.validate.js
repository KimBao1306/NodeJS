module.exports.checkCreate = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.desc;

  if (!title) {
    res.render(`./books/create.pug`, {
      errors: ["Title can not empty"],
      values: req.body
    });
    return;
  }

  if (!desc) {
    res.render(`./books/create.pug`, {
      errors: ["Description can not empty"],
      values: req.body
    });
    return;
  }

  next();
};

module.exports.checkUpdate = (req, res, next) => {
  const title = req.body.title;
  const desc = req.body.desc;
  req.body.id = req.params.id;

  if (!title) {
    res.render(`./books/update.pug`, {
      errors: ["Title can not empty"],
      updateBook: req.body
    });
    return;
  }

  if (!desc) {
    res.render(`./books/update.pug`, {
      errors: ["Description can not empty"],
      updateBook: req.body
    });
    return;
  }

  next();
};
