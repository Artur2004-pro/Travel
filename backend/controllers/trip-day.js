const { sendSuccess } = require("../helpers/utilities/api-response.js");
const tripDayService = require("../services/trip-day.service.js");

class TripDayController {
  constructor() {
    this.service = tripDayService;
  }
  async tripDayById(req, res) {
    const data = req.validated || req.params || {};
    const tripDay = await this.service.tripDayById(data);
    return sendSuccess(res, tripDay);
  }
  async tripDaysByTripId(req, res) {
    const data = req.validated || req.params || {};
    const tripDays = await this.service.tripDaysByTripId(data);
    return sendSuccess(res, tripDays);
  }
  async deleteTripDay(req, res) {
    const data = req.validated || req.params || {};
    const deleted = await this.service.deleteTripDay(data);
    return sendSuccess(res, deleted);
  }
  async updateTripDay(req, res) {
    const data = req.validated || req.body || {};
    const tripDay = this.service.updateTripDay(data);
    return sendSuccess(res, tripDay);
  }
  async createTripDay(req, res) {
    const data = req.validated || req.body || {};
    const tripDay = await this.service.createTripDay(data);
    return sendSuccess(res, tripDay, 201);
  }
}

module.exports = new TripDayController();
