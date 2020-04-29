const bcrypt = require("bcrypt");
const md5 = require("md5");
const db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("./auth/login.pug");
};

module.exports.loginPost = async (req, res) => {
  const emailUser = req.body.email;

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

  if (user.wrongLoginCount >= 3) {
    res.render("./auth/login.pug", {
      errors: [
        "Bạn đã vượt quá số lần đăng nhập. Hãy sử dụng chức năng tìm mật khẩu nhé."
      ],
      values: req.body
    });
    return;
  }

  const checkPass = await bcrypt.compare(req.body.password, user.password);

  if (!checkPass) {
    db.get("users")
      .find({ id: user.id })
      .assign({ wrongLoginCount: ++user.wrongLoginCount })
      .write();

    res.render("./auth/login.pug", {
      errors: ["Your email or password were wrong. Please try again"],
      values: req.body
    });
    return;
  }

  res.cookie("idUser", user.id, { signed: true});

  res.redirect("/");
};

module.exports.logout = (req, res) => {
  res.clearCookie("idUser");

  res.redirect("/");
};
