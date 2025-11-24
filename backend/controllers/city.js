const { City, Country } = require("../models/");
const { deleteImage, handleError, env } = require("../helpers/");
const geolocationApi = require("../lib/geolocation-api.js");
const { cityService } = require("../services/");

class CityController {
  constructor() {
    this.service = cityService;
  }
  // admin
  async add(req, res) {
    try {
      const city = await this.service.add(req.body);
      return res.status(201).send({
        message: "City added successfully",
        payload: city,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const deletedCity = this.service.delete(req.params);
      return res
        .status(200)
        .send({ message: "City deleted successfully", payload: deletedCity });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const city = await this.service(req.body);
      return res.status(200).send({
        message: "City updated successfully",
        payload: city,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async deletePhoto(req, res) {
    try {
      await this.service.deletePhoto(req.body);
      return res.status(200).send({ message: "Image deleted" });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getTop(_, res) {
    try {
      const cities = await this.service.getTop();
      return res.status(200).send({ message: "Success", payload: cities });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  // user
  async search(req, res) {
    try {
      const cities = await this.service.search(req.query);
      return res.status(200).send({ message: "Success", payload: cities });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getCity(req, res) {
    try {
      const city = await this.service.getCity(req.params);
      return res.status(200).send({ message: "success", payload: city });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new CityController();
