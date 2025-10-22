const { User } = require("../models/");
const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
  const { authentication } = req.headers;
  if (!authentication) {
    return res.status(401).send({ message: "Token not found" });
  }
  const token = authentication.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token!!!" });
  }
}

module.exports = isAuth;
