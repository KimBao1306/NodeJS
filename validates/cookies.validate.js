module.exports.checkCookie = (req, res, next) => {
  let count;
  if (!req.cookies.count) {
    count = 1;
  } else {
    count = ++req.cookies.count;
  }
  res.cookie("user-id", Date.parse(new Date()));
  res.cookie("count", count);
  res.locals.count = count;
  next();
};
