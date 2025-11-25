const { userService } = require("../services/");

class AccountController {
  constructor() {
    this.service = userService;
  }
  // admin
  async configureAccount(req, res) {
    try {
      const account = await this.service.configureAccount(req.body);
      const message = account.isBlocked ? "blocked" : "unblocked";
      return res.status(200).send({ message: `User ${message}` });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async search(req, res) {
    try {
      const users = await this.service.search(req.query);
      return res.status(200).send({ message: "Success", payload: users });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getSpecAccount(req, res) {
    try {
      const account = await this.service.getSpecAccount(req.params);
      return res.status(200).send({ message: "Success", payload: account });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async role(req, res) {
    try {
      const user = await this.service.role(req.params);
      return res.status(200).send({
        message: "User role changed successfully",
        payload: user.role,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  // user
  async updatePassword(req, res) {
    try {
      await this.service.updatePassword(req.body);
      return res.status(200).send({ message: "Password updated" });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async updateUsername(req, res) {
    try {
      const account = await this.service.updateUsername(req.body);
      return res
        .status(200)
        .send({ message: "Username updated", payload: account.username });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getAccount(req, res) {
    try {
      const found = await this.service.getAccount({ id: req.user._id });
      return res.status(200).send({ message: "ok", payload: found });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new AccountController();
