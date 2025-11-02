const { User } = require("../models/");
const { createToken } = require("../helpers/");

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
    const jwtToken = createToken({ id: found._id, role: found.role });
    return res.status(200).send({
      message: "Verification success",
      payload: { token: `Bearer ${jwtToken}` },
    });
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
    const jwtToken = createToken({ id: found._id, forgotPassword: true });
    await found.save();
    return res.status(200).send({
      message: "success token for forgot-password",
      payload: { token: `Bearer ${jwtToken}` },
    });
  }
}

module.exports = new EmailController();
