const User = require("../models/user.model.js");
const Book = require("../models/book.model.js");

module.exports.index = async (req, res) => {
  await User.findOneAndUpdate({ _id: res.locals.user.id }, { isAdmin: "shop" });
  res.redirect("/books/create");
};
