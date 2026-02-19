const { deleteImage } = require("../helpers/index.js");
const geolocationApi = require("../lib/geolocation-api.js");
const { City, Country } = require("../models");
const { ServiceError, ErrorHandler } = require("./error-handler.js");
const { env } = require("../helpers/");

class CityService {
  async add(data) {
    try {
      const country = await Country.findOne({ name: data.countryName });
      if (!country) {
        throw new ServiceError("Country not found", 404);
      }
      const geoData = await geolocationApi(data.name);
      if (!geoData) {
        throw new ServiceError("City coordinates not found", 404);
      }
      const city = await City.create({
        name: data.name,
        description: data.description,
        images: data?.files?.map((file) => file.path) || [],
        countryId: country._id,
        lat: geoData.latitude,
        lon: geoData.longitude,
      });
      country.cities.push(city._id);
      await country.save();
      return city;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async delete(data) {
    try {
      const { id } = data;
      const deletedCity = await City.findByIdAndDelete(id);
      if (!deletedCity) {
        throw new ServiceError("City not found", 404);
      }
      return deletedCity;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async update(data) {
    try {
      const city = await City.findById(data.id);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      city.images.push(...data.files.map((file) => file.path));
      if (data.description) {
        city.description = data.description;
      }
      await city.save();
      return city;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async deletePhoto(data) {
    try {
      const { id, filename } = data;
      const { matchedCount, modifiedCount } = await City.updateOne(
        { _id: id },
        { $pull: { images: filename } },
      );
      if (!matchedCount) {
        throw new ServiceError("City not found", 404);
      }
      if (!modifiedCount) {
        throw new ServiceError("Image not found", 404);
      }
      await deleteImage(filename);
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getTop() {
    try {
      const cities = await City.find({}).limit(env.DATA_LIMIT);
      return cities;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async search(data) {
    try {
      const { name, page = 1, limit = env.DATA_LIMIT || 20 } = data || {};
      if (!name || typeof name !== "string") return [];
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const l = Math.min(limit, env.DATA_LIMIT || 100);
      const skip = (Math.max(1, page) - 1) * l;
      const cities = await City.find({ name: { $regex: escaped, $options: "i" } })
        .limit(l)
        .skip(skip);
      return cities || [];
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getCity(data) {
    try {
      const city = await City.findById(data.id);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      return city;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async byCountryId(data) {
    try {
      const cities = await City.find({ countryId: data.id });
      if (!cities || !cities.length) {
        throw new ServiceError("Cities not found", 404);
      }
      return cities;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new CityService();
