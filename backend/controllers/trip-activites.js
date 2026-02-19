const { sendSuccess } = require("../helpers/utilities/api-response.js");
const tripAcitivtyService = require("../services/trip-acitivty.service.js");

class TripActivityController {
  constructor() {
    this.service = tripAcitivtyService;
  }
  async activitiesByTripDayId(req, res) {
    const data = req.validated || req.params || req.query || {};
    const activities = await this.service.activitiesByTripDayId(data);
    return sendSuccess(res, activities);
  }
  async activityById(req, res) {
    const data = req.validated || req.params || {};
    const activity = await this.service.activityById(data);
    return sendSuccess(res, activity);
  }
  async addActivity(req, res) {
    const data = req.validated || req.body || {};
    const acitivty = await this.service.addActivity(data);
    return sendSuccess(res, acitivty);
  }
  async deleteActivity(req, res) {
    const data = req.validated || req.params || {};
    const deleted = await this.service.deleteActivity(data);
    return sendSuccess(res, deleted);
  }
  async updateActivity(req, res) {
    const data = req.validated || req.body || {};
    const activity = await this.service.updateActivity(data);
    return sendSuccess(res, activity);
  }
  async addNightActivity(req, res) {
    const data = req.validated || req.body || {};
    const activity = await this.service.addNightActivity(data);
    return sendSuccess(res, activity);
  }
}

module.exports = new TripActivityController();
