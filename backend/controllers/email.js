const { User } = require("../models/");
const jwt = require("jsonwebtoken");

class EmailController {
  async verifyEmail(req, res) {
    const { token } = req.query;
    if (!token) {
      return res.status(404).send({ message: "Token not found" });
    }
    const found = await User.findOne({ emailVerifyToken: token });
    if (!found) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const expires = found.emailVerifyExpires;
    if (expires.getTime() < Date.now()) {
      return res.status(400).send({ message: "Email verify time expired" });
    }
    found.emailVerified = true;
    found.emailVerifyToken = "";
    await found.save();
    const jwtToken = jwt.sign({ id: found._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .send({ message: "Verification success", payload: { token: jwtToken } });
  }
  async forgotPassword(req, res) {
    const { token } = req.query;

    if (!token) {
      return res.status(404).send({ message: "Token not found!!!" });
    }
    const found = await User.findOne({ forgotPasswordToken: token });
    if (!found) {
      return res.status(404).send({ message: "User not found" });
    }
    found.forgotPasswordToken = "";
    if (Date.now() > found.forgotPasswordExpires.getTime()) {
      return res.status(400).send({ message: "Password reset link expired" });
    }

    const jwtToken = jwt.sign(
      { id: found._id, forgotPassword: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    await found.save();
    return res
      .status(200)
      .send({ message: "success token for forgot-password", token: jwtToken });
  }
}

module.exports = new EmailController();
