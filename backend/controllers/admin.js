const { userService } = require("../services/");

class AdminController {
  constructor() {
    this.service = userService;
  }
  async beAdmin(req, res) {
    try {
      const user = await this.service.beAdmin({ id: req.user._id });
      return res
        .status(200)
        .send({ message: "User role changed successfully", payload: user });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getStatistics(_, res) {
    try {
      const { countries, cities, admins, users } =
        await this.service.getStatistics();

      return res.status(200).send({
        message: "Success",
        payload: { countries, cities, admins, users },
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new AdminController();
