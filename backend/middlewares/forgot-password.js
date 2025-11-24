const { User } = require("../models/");

async function forgotPassword(req, res, next) {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send({ message: "Missing fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (!user.emailVerified) {
    return res.status(409).send({ message: "Email not verified" });
  }

  if (
    user.forgotPasswordToken !== code ||
    user.forgotPasswordExpires < Date.now()
  ) {
    return res.status(409).send({ message: "Invalid or expired code" });
  }

  req.user = user;
  next();
}

module.exports = forgotPassword;
