const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function forgotPassword(req, res, next) {
  const { authentication } = req.headers;
  console.log(req.header, "aaaaa", req.headers)
  if (!authentication) {
    return res.status(401).send({ message: "Token not found" });
  }

  const token = authentication.split(" ")[1];
  try {
    const { id, forgotPassword } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !forgotPassword) {
      return res.status(404).send({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).send({ message: "Invalid token" });
  }
}

module.exports = forgotPassword;
