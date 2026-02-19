const { sendSuccess } = require("../helpers/utilities/api-response");
const { tripService } = require("../services/");

class TripController {
  constructor() {
    this.service = tripService;
  }
  async getTrip(req, res) {
    const data = req.validated || req.params || {};
    const trip = await this.service.getTrip(data);
    return sendSuccess(res, trip);
  }
  async addCoverImage(req, res) {
    const data = req.validated || req.body || {};
    const trip = await this.service.addCoverImage(data);
    return sendSuccess(res, trip);
  }
  async removeCoverImage(req, res) {
    const data = req.validated || req.body || {};
    const trip = await this.service.removeCoverImage(data);
    return sendSuccess(res, trip);
  }
  async getMyTrips(req, res) {
    const trips = await this.service.getMyTrips({ id: req.user._id });
    return sendSuccess(res, trips);
  }
  async update(req, res) {
    const data = req.validated || req.body || {};
    const updatedTrip = await this.service.update(data);
    return sendSuccess(res, updatedTrip);
  }
  async togglePrivate(req, res) {
    const data = req.validated || req.body || {};
    const trip = await this.service.togglePrivate(data);
    return sendSuccess(res, trip);
  }
  async toggleComplete(req, res) {
    const data = req.validated || req.body || {};
    const trip = await this.service.toggleComplete(data);
    return sendSuccess(res, trip);
  }
  async getAllTrips(req, res) {
    const data = req.validated || req.query || {};
    const trips = await this.service.getAllTrips(data);
    return sendSuccess(res, trips);
  }
  async add(req, res) {
    const data = req.validated || req.body || {};
    const trip = await this.service.add(data);
    return sendSuccess(res, trip);
  }
  async delete(req, res) {
    const data = req.validated || req.params || {};
    const trip = await this.service.delete(data);
    return sendSuccess(res, trip);
  }
  async getPdf(req, res) {
    const data = req.validated || req.params || {};
    const pdf = await this.service.getPdf(data);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="trip-${req.params.id}.pdf"`,
    );
    return res.send(pdf);
  }
}

module.exports = new TripController();
