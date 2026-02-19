const { sendSuccess } = require("../helpers/utilities/api-response");
const { cityService } = require("../services/");

class CityController {
  constructor() {
    this.service = cityService;
  }
  // admin
  async add(req, res) {
    const data = req.validated || req.body || {};
    const city = await this.service.add(data);
    return sendSuccess(res, city);
  }
  async delete(req, res) {
    const data = req.validated || req.params || {};
    const deletedCity = await this.service.delete(data);
    return sendSuccess(res, deletedCity);
  }
  async toggleLike(req, res) {
    const { sendError } = require("../helpers/utilities/api-response");
    return sendError(res, "NOT_IMPLEMENTED", "Not implemented", 501);
  }
  async update(req, res) {
    const data = req.validated || req.body || {};
    const city = await this.service.update(data);
    return sendSuccess(res, city);
  }
  async deletePhoto(req, res) {
    const data = req.validated || req.body || {};
    await this.service.deletePhoto(data);
    return sendSuccess(res, "Image deleted");
  }
  async getTop(_, res) {
    const cities = await this.service.getTop();
    return sendSuccess(res, cities);
  }
  // user
  async search(req, res) {
    const data = req.validated || req.query || {};
    const cities = await this.service.search(data);
    return sendSuccess(res, cities);
  }
  async getCity(req, res) {
    const data = req.validated || req.params || {};
    const city = await this.service.getCity(data);
    return sendSuccess(res, city);
  }
  async byCountryId(req, res) {
    const data = req.validated || req.params || {};
    const cities = await this.service.byCountryId(data);
    return sendSuccess(res, cities);
  }
}

module.exports = new CityController();
