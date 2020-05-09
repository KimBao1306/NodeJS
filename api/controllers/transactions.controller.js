const shortId = require("shortid");
const Transaction = require("../../models/transaction.model.js");

module.exports.index = async (req, res) => {
  const transactionsP = res.locals.user.isAdmin
    ? Transaction.find()
    : Transaction.find({ idUser: req.signedCookies.idUser });

  const transactions = await transactionsP;
  res.json({success: true, mess: "Tìm dữ liệu thành công", data: transactions});
};

module.exports.delete = (req, res) => {
  const _id = req.params.id;

  Transaction.findOneAndRemove({ _id }, err => {
    if (err) return res.json({success: false, mess: "Đã xảy ra lỗi"});
    res.json({success: true, mess: "Xóa thành công"});
  });
};

module.exports.updatePost = (req, res) => {
  const _id = req.params.id;
  const isComplete = +req.body.isComplete;

  Transaction.findOneAndUpdate({ _id }, { isComplete }, err => {
    if (err) return res.json({success: false, mess: "Đã xảy ra lỗi"});
    res.json({success: true, mess: "Cập nhật thành công"});
  });

};

module.exports.createPost = async (req, res) => {
  const idUser = req.body.user;
  const idBook = req.body.book;
  const isComplete = 0;

  await Transaction.create({ idUser, idBook, isComplete });

  res.json("Khởi tạo thành công");
};

// module.exports.createInCart = async (req, res, next) => {
//   const cart = await Session.findOne({
//     idSession: req.signedCookies.idSession
//   });

//   if (!cart.cart.length) {
//     res.redirect("/books/show");
//     return;
//   }

//   for (let idBook of cart.cart) {
//     const idUser = req.signedCookies.idUser;
//     const isComplete = 0;

//     Transaction.create({ idUser, idBook, isComplete });
//   }

//   res.clearCookie("idSession");

//   res.redirect("/transactions/show");
// };
