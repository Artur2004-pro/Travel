const { sendSuccess } = require("../helpers/utilities/api-response");
const { countryService } = require("../services/");

class CountryController {
  constructor() {
    this.service = countryService;
  }
  // admin
  async add(req, res) {
    const data = req.validated || req.body || {};
    const country = await this.service.add(data);
    return sendSuccess(res, country, 201);
  }
  async delete(req, res) {
    const data = req.validated || req.params || {};
    await this.service.delete(data);
    return sendSuccess(res, "Country deleted successfully");
  }
  async update(req, res) {
    const data = req.validated || req.body || {};
    const country = await this.service.update(data);
    return sendSuccess(res, country);
  }
  async deletePhoto(req, res) {
    const data = req.validated || req.body || {};
    await this.service.deletePhoto(data);
    return sendSuccess(res, "Image deleted successfully");
  }
  // user
  async getTop(_, res) {
    const countries = await this.service.getTop();
    return sendSuccess(res, countries);
  }
  async getById(req, res) {
    const data = req.validated || req.params || {};
    const country = await this.service.getById(data);
    return sendSuccess(res, country);
  }
  async search(req, res) {
    const data = req.validated || req.query || {};
    const countries = await this.service.search(data);
    return sendSuccess(res, countries);
  }
}

module.exports = new CountryController();
