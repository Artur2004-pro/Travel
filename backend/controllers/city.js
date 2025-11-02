const { City } = require("../models/");
const { Country } = require("../models/");
const { deleteImage, handleError } = require("../helpers/");

class CityController {
  // admin
  async add(req, res) {
    try {
      const { files } = req;
      const { countryId } = req.params;
      const { name, description } = req.body;
      if (!name || !description || !countryId) {
        return res
          .status(400)
          .send({ message: "Missing fields: name or description" });
      }

      if (!files || files.length === 0) {
        return res.status(400).send({ message: "No image files provided" });
      }
      const images = files.map((file) => file.path);

      const city = await City.create({
        countryId,
        name,
        description,
        images,
      });
      await Country.findByIdAndUpdate(countryId, {
        $push: { cities: city._id },
      });
      return res.status(201).send({
        message: "City added successfully",
        payload: { city },
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing ID" });
    }
    try {
      const deletedCity = await City.findByIdAndDelete(id);
      if (!deletedCity) {
        return res.status(404).send({ message: "City not found" });
      }
      deleteImage(deletedCity.images);
      return res.status(200).send({ message: "City deleted successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async update(req, res) {
    const { files } = req;
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    if (!files && !name && !description) {
      return res.status(400).send({ message: "Missing fields" });
    }
    try {
      const city = await City.findById(id);
      if (!city) {
        return res.status(404).send({ message: "City not found" });
      }
      if (files) {
        const images = files.map((file) => file.path);
        city.images.push(...images);
      }
      if (name) {
        city.name = name;
      }
      if (description) {
        city.description = description;
      }
      await city.save();
      return res.status(200).send({
        message: "City updated successfully",
        payload: { city },
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async deletePhoto(req, res) {
    const { id } = req.params;
    const { filename } = req.query;
    if (!id || !filename) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const { matchedCount, modifiedCount } = await City.updateOne(
        { _id: id },
        { images: { $pull: filename } }
      );
      if (!matchedCount) {
        return res.status(404).send({ message: "City not found" });
      }
      if (!modifiedCount) {
        return res.status(404).send({ message: "Image not found" });
      }
      await deleteImage(filename);
      return res
        .status(200)
        .send({ message: "Image deleted", payload: { city } });
    } catch (error) {
      return handleError(res, error);
    }
  }

  // user
  async search(req, res) {
    const { name, country } = req.query;
    if (!name || !country) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const cities = await City.find({ name: { $regex: name } });
      if (!cities) {
        return res.status(404).send({ message: "Cities not found" });
      }
      return res.status(200).send({ message: "Success", payload: { cities } });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getCity(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing city id" });
    }
    try {
      const city = await City.findById(id);
      if (!city) {
        return res.status(404).send({ message: "City not found" });
      }
      return res.status(200).send({ message: "success", payload: city });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getCities(req, res) {
    const { countryId } = req.params;
    if (!countryId) {
      return res.status(400).send({ message: "Missing country id" });
    }
    try {
      const cities = await City.find({
        countryId: countryId,
      });

      if (!cities || !cities?.length) {
        return res.status(404).send({ message: "Cities not found" });
      }
      return res.status(200).send({ message: "success", payload: cities });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new CityController();
