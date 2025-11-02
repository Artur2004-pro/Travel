const { User } = require("../models/");
const { env } = require("../helpers/");
const { handleError } = require("../helpers/");

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
    try {
      const user = await User.findById(req.user._id);
      user.role = "admin";
      await user.save();
      return res
        .status(200)
        .send({ message: "User role changed successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new AdminController();
