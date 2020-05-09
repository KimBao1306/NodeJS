const bcrypt = require("bcrypt");
// const db = require("../db.js");
const User = require("../models/user.model.js");
//sử dụng để gửi mail
const sgMail = require("@sendgrid/mail");

module.exports.register = (req, res) => {
  res.render("./auth/register.pug");
};

module.exports.registerPost = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 8);
  const isAdmin = 'user';
  const wrongLoginCount = 0;
  const avatarUrl =
    "https://res.cloudinary.com/bao-codersx/image/upload/v1588352037/defaultImg_tghmng.png";

  await User.create({
    name,
    email,
    password,
    isAdmin,
    wrongLoginCount,
    avatarUrl
  });
  
  res.redirect("/auth/login");
};

module.exports.login = (req, res) => {
  res.render("./auth/login.pug");
};

const sendMail = () => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: "baolkps08687@fpt.edu.vn",
    from: "kimbao756g@gmail.com",
    subject: "Attention your account",
    text: "Your account login wrong password thrice. Please change password",
    html:
      "<strong>Your account login wrong password thrice. Please change password</strong>"
  };
  //ES6
  sgMail.send(msg).then(
    () => {},
    error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

module.exports.loginPost = async (req, res) => {
  const emailUser = req.body.email;

  const user = await User.findOne({ email: emailUser });

  if (!user) {
    res.render("./auth/login.pug", {
      errors: ["Can not find your account. Please try again"],
      values: req.body
    });
    return;
  }

  if (user.wrongLoginCount >= 3) {
    sendMail();

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
    User.findOneAndUpdate(
      { _id: user.id },
      { wrongLoginCount: ++user.wrongLoginCount }
    );

    res.render("./auth/login.pug", {
      errors: ["Your email or password were wrong. Please try again"],
      values: req.body
    });
    return;
  }

  res.cookie("idUser", user.id, { signed: true });
  
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  res.clearCookie("idUser");

  res.redirect("/");
};
