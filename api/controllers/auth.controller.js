const bcrypt = require("bcrypt");
// const db = require("../db.js");
const User = require("../../models/user.model.js");
//sử dụng để gửi mail
const sgMail = require("@sendgrid/mail");
//jwt
const jwt = require("jsonwebtoken");

module.exports.loginPost = async (req, res) => {
  const emailUser = req.body.email;

  const user = await User.findOne({ email: emailUser });

  if (!user) {
    res.json({ success: false, mess: "Tài khoản không tồn tại" });
    return;
  }

  if (user.wrongLoginCount >= 3) {
    res.json({
      success: false,
      mess:
        "Bạn đã vượt quá số lần đăng nhập. Hãy sử dụng chức năng tìm mật khẩu"
    });
    return;
  }

  const checkPass = await bcrypt.compare(req.body.password, user.password);

  if (!checkPass) {
    User.findOneAndUpdate(
      { _id: user.id },
      { wrongLoginCount: ++user.wrongLoginCount }
    );
    res.json({ success: false, mess: "Tài khoản hoặc mật khẩu không đúng" });
    return;
  }
  
  const token = jwt.sign(user.toJSON(), process.env.PRIVATE_JWT_KEY);

  // res.cookie("idUser", token, { signed: true });

  res.json({ success: true, mess: "Đăng nhập thành công", token });
};

module.exports.logout = (req, res) => {
  // res.clearCookie("idUser");
  // res.redirect("/");
};
