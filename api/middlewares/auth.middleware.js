// const db = require("../db.js");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model.js");
const Session = require("../../models/session.model.js");

module.exports.checkLogin = async (req, res, next) => {
  const token = req.get("token");

  
  if (!token) {
    res.json({success: false, mess: "Bạn cần đăng nhập trước khi sử dụng chức năng này" });
    return;
  }

  const verifyToken = jwt.verify(token, process.env.PRIVATE_JWT_KEY);

  if(!verifyToken) {
    res.json({success: false, mess: "Không tồn tại tài khoản này" });
    return;
  }
  
  res.locals.user = verifyToken;

  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (!res.locals.user.isAdmin) {
    res.json("Bạn không có đủ quyền hạn để thực thi");
    return;
  }

  next();
};
