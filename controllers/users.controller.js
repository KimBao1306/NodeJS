const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");

module.exports.index = (req, res) => {
  res.render("./users/index.pug");
};

module.exports.show = async (req, res) => {
  const users = await User.find();
  res.render("./users/show.pug", {
    users
  });
};

module.exports.delete = async (req, res) => {
  const _id = req.params.id;
  await User.deleteOne({ _id });
  res.redirect("/users/show");
};

module.exports.update = async (req, res) => {
  const _id = req.params.id;
  const updateUser = User.findOne({ _id });

  res.render("./users/update.pug", {
    updateUser
  });
};

module.exports.updatePost = async (req, res) => {
  const _id = req.params.id;
  const newName = req.body.name;

  await User.updateOne({ _id }, { name: newName });

  res.redirect("/users/show");
};

module.exports.search = (req, res) => {
  res.render("./users/search.pug");
};

module.exports.searchResult = async (req, res) => {
  const name = req.query.name.toLowerCase();

  const users = await User.find();

  const matchedUsers = users.filter(user =>
    user.name.toLowerCase().includes(name)
  );

  res.render("./users/show.pug", {
    users: matchedUsers
  });
};

module.exports.create = (req, res) => {
  res.render("./users/create.pug");
};

module.exports.createPost = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 8);
  const isAdmin = 0;
  const wrongLoginCount = 0;
  const avatarUrl =
    "https://res.cloudinary.com/bao-codersx/image/upload/v1588352037/defaultImg_tghmng.png";

  User.create({
    name,
    email,
    password,
    isAdmin,
    wrongLoginCount,
    avatarUrl
  }).then(() => res.redirect("/users/show"));
};
