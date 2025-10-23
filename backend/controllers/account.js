const bcrypt = require("bcrypt");
const { User } = require("../models/");
class AccountController {
  async updatePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword?.trim() || !newPassword?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    if (newPassword.trim().length < 6) {
      return res
        .status(409)
        .send({ message: "Password must be at least 6 characters long" });
    }
    const found = await User.findById(req.user._id);
    if (!found) {
      return res.status(404).send({ message: "Invalid data" });
    }
    const verify = await bcrypt.compare(oldPassword, found.password);
    if (!verify) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    try {
      found.password = hash;
      await found.save();
      return res.status(200).send({ message: "Password updated" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async updateUsername(req, res) {
    const { username, password } = req.body;

    const found = await User.findById(req.user._id);
    if (!found) {
      return res.status(404).send({ message: "Invalid data" });
    }
    const verify = await bcrypt.compare(password, found.password);
    if (!verify) {
      return res.status(400).send({ message: "Invalid password" });
    }
    try {
      found.username = username;
      await found.save();
      return res
        .status(200)
        .send({ message: "Username updated", payload: username });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new AccountController();
