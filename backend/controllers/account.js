const bcrypt = require("bcrypt");
const { User } = require("../models/");

class AccountController {
  // admin
  async configureAccount(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "ID not found" });
    }
    try {
      const user = await User.findById(id);
      user.isBlocked = !user.isBlocked;
      await user.save();
      const message = user.isBlocked ? "blocked" : "unblocked";
      return res
        .status(200)
        .send({ message: `User ${message}`, payload: user.isBlocked });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async search(req, res) {
    const { search } = req.query;
    if (!search || !search?.trim()) {
      return res.status(400).send({ message: "Missing search params..." });
    }
    try {
      const users = await User.find({
        username: { $regex: search, $options: "i" },
      }).select(["username", "email", "role", "isBlocked", "_id", "avatar"]);
      if (!users) {
        return res.status(404).send({ message: "Users not found" });
      }
      return res.status(200).send({ message: "Success", payload: users });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async getSpecAccount(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    try {
      const account = await User.findById(id).select([
        "-password",
        "-emailVerifyExpires",
        "-emailVerifyToken",
        "-forgotPasswordToken",
        "-forgotPasswordExpires",
        "-forgotUsernameToken",
        "-forgotUsernameExpires",
      ]);
      if (!account) {
        return res.status(404).send({ message: "Account not found" });
      }
      return res.status(200).send({ message: "Success", payload: account });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  async role(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing user id" });
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      if (!user.emailVerified) {
        return res.status(409).send({ message: "User email not verified!" });
      }
      user.role = user.role == "admin" ? "user" : "admin";
      await user.save();

      return res.status(200).send({
        message: "User role changed successfully",
        payload: user.role,
      });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  // user
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
  async getAccount(req, res) {
    const { user } = req;
    user.password = "";
    return res.status(200).send({ message: "ok", payload: { user } });
  }
}

module.exports = new AccountController();
