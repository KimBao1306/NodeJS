const cloudinary = require("cloudinary").v2;
const User = require("../models/user.model.js");

module.exports.index = (req, res) => {
  res.render("./profile/index.pug", {
    user: res.locals.user
  });
};

module.exports.updateProfile = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  let avatarUrl;

  if (req.file) {
    const path = req.file.path;

    const cloud = await cloudinary.uploader.upload(`./${path}`);

    avatarUrl = cloud.url;
  }

  await User.updateOne({ email }, { name, avatarUrl });

  res.redirect("/profile");
};
