const { User } = require("../models/");

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
    found.emailVerifyed = true;
    found.emailVerifyToken = "";
    await found.save();
    const jwtToken = jwt.sign({ id: found._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .send({ message: "Veryfication success", token: jwtToken });
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
    if (Date.now() > found.forgotPasswordExpires.getTime()) {
      return res.status(400).send({ message: "password time required" });
    }

    const jwtToken = jwt.sing({ id: found._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({ message: "success", token: jwtToken });
  }
}

module.exports = new EmailController();
