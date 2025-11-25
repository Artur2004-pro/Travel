const { countryService } = require("../services/");

class CountryController {
  constructor() {
    this.service = countryService;
  }
  // admin
  async add(req, res) {
    try {
      const country = await this.service.add(req.body);
      return res.status(201).send({
        message: "Country added successfully",
        payload: country,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      await this.service.delete(req.params);
      return res.status(200).send({ message: "Country deleted successfully" });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async update(req, res) {
    try {
      const country = await this.service.update(req.body);
      return res.status(200).send({
        message: "Country updated successfully",
        payload: country,
      });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async deletePhoto(req, res) {
    try {
      await this.service.deletePhoto(req.body);
      return res.status(200).send({ message: "Image deleted successfully" });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  // user
  async getTop(_, res) {
    try {
      const countries = await this.service.getTop();
      return res.status(200).send({ message: "ok", payload: countries });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async getById(req, res) {
    try {
      const country = await this.service.getById(req.params);
      return res.status(200).send({ message: "success", payload: country });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async search(req, res) {
    try {
      const countries = await this.service.search(req.query);
      return res.status(200).send({ message: "ok", payload: countries });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new CountryController();
