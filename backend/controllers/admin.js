const { User } = require("../models/");
const { env } = require("../helpers/");

class AdminController {
  async beAdmin(req, res) {
    const { adminToken } = req.body;
    if (!adminToken) {
      return res.status(400).send({ message: "Missing admin token" });
    }
    if (req.user.role == "admin") {
      return res.status(400).send({ message: "User is admin" });
    }
    if (adminToken != env.ADMIN_KEY) {
      return res.status(400).send({ message: "Invalid token" });
    }
    const user = await User.findById(req.user._id);
    user.role = "admin";
    await user.save();
    return res.status(200).send({ message: "User role changed successfully" });
  }
  async makeAdmin(req, res) {
    const { id } = req.body;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      user.role = "admin";
      await user.save();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async makeUser(req, res) {
    const { id } = req.body;
    if (!id) {
      return res.status(404).send({ message: "ID not found" });
    }
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      user.role = "user";
      await user.save();
      return res
        .status(200)
        .send({ message: "User role changed successfully" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new AdminController();
