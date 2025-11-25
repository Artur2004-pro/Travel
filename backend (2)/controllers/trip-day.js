const tripDayService = require("../services/trip-day.service.js");

class TripDayController {
  constructor() {
    this.service = tripDayService;
  }
  async tripDayById(req, res) {
    try {
      const tripDay = await this.service.tripDayById(req.body);
      return res.status(200).send({
        message: "Success",
        payload: tripDay,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async tripDaysByTripId(req, res) {
    try {
      const tripDays = await this.service.tripDaysByTripId(req.body);
      return res.status(200).send({
        message: "Success",
        payload: tripDays,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async deleteTripDay(req, res) {
    try {
      const deleted = await this.service.deleteTripDay(req.body);
      return res.status(200).send({
        message: "Trip day deleted successfully",
        payload: deleted,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async updateTripDay(req, res) {
    try {
      const tripDay = this.service.updateTripDay(req.body);
      return res.status(200).send({
        message: "Trip day updated successfully",
        payload: tripDay,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async createTripDay(req, res) {
    try {
      const tripDay = await this.service.createTripDay(req.body);
      return res.status(201).send({
        message: "Trip day created successfully",
        payload: tripDay,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new TripDayController();
