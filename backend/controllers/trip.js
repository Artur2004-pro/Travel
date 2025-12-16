const { tripService } = require("../services/");

class TripController {
  constructor() {
    this.service = tripService;
  }
  async getTrip(req, res) {
    try {
      const trip = await this.service.getTrip(req.body);
      return res.status(200).send({ message: "Ok", payload: trip });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async addCoverImage(req, res) {
    try {
      const trip = await this.service.addCoverImage(req.body);
      return res.status(200).send({
        message: "Cover image added",
        payload: trip,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async removeCoverImage(req, res) {
    try {
      const trip = await this.service.removeCoverImage(req.body);
      return res
        .status(200)
        .send({ message: "Cover image deleted successfully", payload: trip });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getMyTrips(req, res) {
    try {
      const trips = await this.service.getMyTrips({ id: req.user._id });
      return res.status(200).send({
        message: "Success",
        payload: trips,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const updatedTrip = await this.service.update(req.body);
      return res.status(200).send({
        message: "Trip updated",
        payload: updatedTrip,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async togglePrivate(req, res) {
    try {
      const trip = await this.service.togglePrivate(req.body);
      return res
        .status(200)
        .send({ message: "Successfully updated", payload: trip });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getAllTrips(req, res) {
    try {
      const trips = await this.service.getAllTrips(req.body);
      return res.status(200).send({ message: "Sucess", payload: trips });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async add(req, res) {
    try {
      const trip = await this.service.add(req.body);
      return res.status(201).send({
        message: "Trip created",
        payload: trip,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const trip = await this.service.delete(req.body);
      return res.status(200).send({ message: "Trip deleted", payload: trip });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new TripController();
