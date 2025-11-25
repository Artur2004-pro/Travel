const tripAcitivtyService = require("../services/trip-acitivty.service.js");

class TripActivityController {
  constructor() {
    this.service = tripAcitivtyService;
  }
  async activitiesByTripDayId(req, res) {
    try {
      const activities = await this.service.activitiesByTripDayId(req.body);
      return res.status(200).send({
        message: "Success",
        payload: activities,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async activityById(req, res) {
    try {
      const activity = await this.service.activityById(req.body);
      return res.status(200).send({
        message: "Success",
        payload: activity,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async addActivity(req, res) {
    try {
      const acitivty = await this.service.addActivity(req.body);
      return res.status(201).send({
        message: "Activity added successfully",
        payload: acitivty,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async deleteActivity(req, res) {
    try {
      const deleted = await this.service.deleteActivity(req.body);
      return res.status(200).send({
        message: "Activity deleted successfully",
        payload: deleted,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async updateActivity(req, res) {
    try {
      const activity = await this.service.updateActivity(req.body);
      return res.status(200).send({
        message: "Activity updated successfully",
        payload: activity,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async addNightActivity(req, res) {
    try {
      const activity = await this.service.addNightActivity(req.body);
      return res.status(201).send({
        message: "Night activity added successfully",
        payload: activity,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new TripActivityController();
