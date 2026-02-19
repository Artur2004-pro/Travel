const { sendSuccess } = require("../helpers/utilities/api-response");
const { userService } = require("../services/");

class AdminController {
  constructor() {
    this.service = userService;
  }
  async beAdmin(req, res) {
    const data = req.validated || req.body || {};
    const user = await this.service.beAdmin(data);
    return sendSuccess(res, user);
  }
  async getStatistics(_, res) {
    const { countries, cities, admins, users } =
      await this.service.getStatistics();
    return sendSuccess(res, { countries, cities, admins, users });
  }
}

module.exports = new AdminController();
