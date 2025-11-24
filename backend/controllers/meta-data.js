const metadataService = require("../services/metadata.service.js");

class MetaDataController {
  constructor() {
    this.service = metadataService;
  }
  async hotels(req, res) {
    try {
      const data = await this.service.hotels(req.query);
      return res
        .status(200)
        .send({ message: "sucess", payload: data, cache: true });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async activities(req, res) {
    try {
      const activities = await this.service.activities(req.query);
      return res
        .status(200)
        .send({ message: "Success", payload: activities, cache: true });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
  async nightLife(req, res) {
    try {
      const nightActivity = await this.service.nightLife(req.query);
      return res
        .status(200)
        .send({ message: "Success", payload: nightActivity });
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

module.exports = new MetaDataController();
