const env = require("../helpers/utilities/env.js");

class AdminValidator {
  static beAdmin(req, res, next) {
    if (req.user.role == "admin") {
      return res.status(400).send({ message: "User is admin" });
    }
    const { adminToken } = req.body;
    if (!adminToken?.trim()) {
      return res.status(400).send({ message: "Missing admin token" });
    }
    if (adminToken != env.ADMIN_KEY) {
      return res.status(400).send({ message: "Invalid token" });
    }
    next();
  }
}

module.exports = AdminValidator;
