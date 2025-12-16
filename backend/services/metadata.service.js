const metaDataApi = require("../lib/meta-data-api.js");
const { getCachedDataBy } = require("../helpers");
const { ErrorHandler, ServiceError } = require("./error-handler.js");
const { City } = require("../models/index.js");

class MetaDataService {
  async hotels(data) {
    try {
      const city = await City.findById(data.id);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      const key = `hotel:${city.name}`;
      const cachedData = await getCachedDataBy(key);
      if (cachedData.cache == "empty") {
        const newData = await metaDataApi.fetchHotels(city.name);
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
      const city = await City.findById(data.id);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      const key = `activity:${city.name}`;
      const cachedData = await getCachedDataBy(key);
      if (cachedData.cache == "empty") {
        const newData = await metaDataApi.fetchActivity(city.name);
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
      const city = await City.findById(data.id);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      const key = `night-life:${city.name}`;
      const cachedData = await getCachedDataBy(key);
      if (cachedData.cache == "empty") {
        const newData = await metaDataApi.fetchNightLife(city.name);
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
