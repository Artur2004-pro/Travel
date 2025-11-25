const metaDataApi = require("../lib/meta-data-api.js");
const { getCachedDataBy } = require("../helpers");
const { ErrorHandler, ServiceError } = require("./error-handler.js");

class MetaDataService {
  async hotels(data) {
    try {
      const key = `hotel:${data.name}`;
      const cachedData = await getCachedDataBy(key);
      if (cachedData.cache == "empty") {
        const newData = await metaDataApi.fetchHotels(data.name);
        if (!newData) {
          throw new ServiceError("Hotels not found", 404);
        }
        return newData;
      }
      return cachedData;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async activities(data) {
    try {
      const key = `activity:${data.name}`;
      const cachedData = await getCachedDataBy(key);
      if (!cachedData.cache == "empty") {
        const newData = await metaDataApi.fetchActivity(data.name);
        if (!newData) {
          throw new ServiceError("Activities not found", 404);
        }
        return newData;
      }
      return cachedData;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async nightLife(data) {
    try {
      const key = `night-life:${data.name}`;
      const cachedData = await getCachedDataBy(key);
      if (cachedData.cache == "empty") {
        const newData = await metaDataApi.fetchNightLife(data.name);
        if (!newData) {
          throw new ServiceError("Night activity not found", 404);
        }
        return newData;
      }
      return cachedData;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new MetaDataService();
