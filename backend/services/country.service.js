const { Country } = require("../models");
const { ServiceError, ErrorHandler } = require("./error-handler.js");
const geolocationApi = require("../lib/geolocation-api.js");
const { deleteImage } = require("../helpers/index.js");
const { env } = require("../helpers/");

class CountryService {
  async add(data) {
    try {
      const geolocation = await geolocationApi(data.name);
      if (!geolocation) {
        throw new ServiceError("Country coordinates not found", 404);
      }
      const { name, description, images } = data;
      const { latitude, longitude } = geolocation;

      const country = await Country.create({
        name,
        description,
        images,
        lat: latitude,
        lon: longitude,
      });
      return country;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async delete(data) {
    try {
      const { id } = data;
      const deleted = await Country.findByIdAndDelete(id);
      if (!deleted) {
        throw new ServiceError("Country not found", 404);
      }
      return deleted;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async update(data) {
    try {
      const country = await Country.findById(data.id);
      if (!country) {
        throw new ServiceError("Country not found", 404);
      }
      if (data.images?.length) {
        country.images.push(...data.images);
      }
      if (data.description) {
        country.description = data.description;
      }
      await country.save();
      return country;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async deletePhoto(data) {
    try {
      const { filename, id } = data;
      const { modifiedCount, matchedCount } = await Country.updateOne(
        { _id: id },
        { $pull: { images: filename } }
      );
      if (!matchedCount) {
        throw new ServiceError("Country not found", 404);
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
      const countries = await Country.find({})
        .sort({ top: -1 })
        .limit(env.DATA_LIMIT)
        .populate("cities");
      return countries;
    } catch (err) {
      console.log(err);
      throw ErrorHandler.normalize(err);
    }
  }
  async getById(data) {
    try {
      const country = await Country.findById(data.id);
      if (!country) {
        throw new ServiceError("Country not found", 404);
      }
      return country;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async search(data) {
    try {
      const { name } = data;
      const countries = await Country.find({
        name: { $regex: `^${name}`, $options: "i" },
      }).limit(env.DATA_LIMIT);
      if (!countries || !countries.length) {
        throw new ServiceError("Countries not found", 404);
      }
      return countries;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new CountryService();
