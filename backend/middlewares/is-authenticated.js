const { User } = require("../models/");
const { verifyToken } = require("../helpers/jwt.js");

async function isAuth(req, res, next) {
  const { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).send({ message: "Token not found" });
  }
  const token = authentication.split(" ")[1];

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).send({ message: "Invalid token!!!" });
  }
  const { id } = payload;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  req.user = user;
  next();
}

module.exports = isAuth;
