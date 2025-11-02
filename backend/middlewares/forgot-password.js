const { User } = require("../models");
const { verifyToken } = require("../helpers/");

async function forgotPassword(req, res, next) {
  const { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).send({ message: "Token not found" });
  }

  const token = authentication.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(404).send({ message: "Invalid token" });
  }
  const { id, forgotPassword } = payload;
  const user = await User.findById(id);
  if (!user || !forgotPassword) {
    return res.status(404).send({ message: "Invalid token" });
  }
  req.user = user;
  next();
}

module.exports = forgotPassword;
