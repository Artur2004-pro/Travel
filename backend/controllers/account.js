const { userService } = require("../services/");
const { sendSuccess } = require("../helpers/utilities/api-response");
class AccountController {
  constructor() {
    this.service = userService;
  }
  // admin
  async configureAccount(req, res) {
    const data = req.validated || req.body || {};
    const account = await this.service.configureAccount(data);
    const message = account.isBlocked ? "blocked" : "unblocked";
    return sendSuccess(res, { message: `User ${message}`, payload: account });
  }
  async search(req, res) {
    const data = req.validated || req.query || {};
    const users = await this.service.search(data);
    return sendSuccess(res, { message: "Success", payload: users });
  }
  async getSpecAccount(req, res) {
    const data = req.validated || req.params || {};
    const account = await this.service.getSpecAccount(data);
    return sendSuccess(res, { message: "Success", payload: account });
  }
  async role(req, res) {
    const data = req.validated || req.body || {};
    const user = await this.service.role(data);
    return sendSuccess(res, {
      message: "User role changed successfully",
      payload: user.role,
    });
  }
  // user
  async updatePassword(req, res) {
    const data = req.validated || req.body || {};
    await this.service.updatePassword(data);
    return sendSuccess(res, { message: "Password updated" });
  }
  async updateUsername(req, res) {
    const data = req.validated || req.body || {};
    const account = await this.service.updateUsername(data);
    return sendSuccess(res, {
      message: "Username updated",
      payload: account.username,
    });
  }
  async getAccount(req, res) {
    const found = await this.service.getAccount({ id: req.user._id });
    return sendSuccess(res, { message: "ok", payload: found });
  }
  async updateAvatar(req, res) {
    const data = req.validated || { userId: req.user._id, file: req.file };
    const updated = await this.service.updateAvatar(data);
    return sendSuccess(res, { message: "Avatar updated", payload: updated });
  }
}

module.exports = new AccountController();
