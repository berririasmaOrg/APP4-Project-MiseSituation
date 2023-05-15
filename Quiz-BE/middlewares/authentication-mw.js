
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "You are not authorized" });
  }
  const token = authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, "secret");
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).send({ message: "You are not authorized" });
  }
  req.user = user;
  next();
};