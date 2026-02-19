const { sendSuccess } = require("../helpers/utilities/api-response.js");
const metadataService = require("../services/metadata.service.js");

class MetaDataController {
  constructor() {
    this.service = metadataService;
  }
  async hotels(req, res) {
    const data = req.validated || req.query || req.body || {};
    const out = await this.service.hotels(data);
    return sendSuccess(res, out);
  }
  async activities(req, res) {
    const data = req.validated || req.query || req.body || {};
    const activities = await this.service.activities(data);
    return sendSuccess(res, activities);
  }
  async nightLife(req, res) {
    const data = req.validated || req.query || req.body || {};
    const nightActivity = await this.service.nightLife(data);
    return sendSuccess(res, nightActivity);
  }
}

module.exports = new MetaDataController();
