const db = require("../db.js");
const users = db.get("users").value();

module.exports.index = (req, res) => {
  res.render("./users/index.pug");
};

module.exports.show = (req, res) => {
  res.render("./users/show.pug", {
    users
  });
};

module.exports.delete = (req, res) => {
  const id = +req.params.id;
  db.get("users")
    .remove({ id })
    .write();
  res.redirect("/users/show");
};

module.exports.update = (req, res) => {
  const id = +req.params.id;
  const updateUser = users.find(u => u.id === id);
  res.render("./users/update.pug", {
    updateUser
  });
};

module.exports.updatePost = (req, res) => {
  const id = +req.params.id;
  const newName = req.body.name;
  db.get("users")
    .find({ id })
    .assign({ name: newName })
    .write();
  res.redirect("/users/show");
};

module.exports.search = (req, res) => {
  res.render("./users/search.pug");
};

module.exports.searchResult = (req, res) => {
  const name = req.query.name.toLowerCase();
  const matchedUsers = users.filter(u => u.name.toLowerCase().includes(name));
  res.render("./users/show.pug", {
    users: matchedUsers
  });
};

module.exports.create = (req, res) => {
  res.render("./users/create.pug");
};

module.exports.createPost = (req, res) => {
  const name = res.locals.u.name;
  const email = res.locals.u.email;
  const password = "123123";
  const isAdmin = 0;
  const id = Date.parse(new Date());
  
  if(users.some(u => u.email === email)) {
    res.render('./users/create.pug', {
      errors: ["Email used"],
      values: req.body
    })
    return;
  }
  
  const newUser = { id, name, email, password, isAdmin };
  db.get("users")
    .push(newUser)
    .write();
  res.redirect("/users/show");
};
