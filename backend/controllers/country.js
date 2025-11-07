const { Country, City } = require("../models/");
const { deleteImage, handleError } = require("../helpers/");

class CountryController {
  // admin
  async add(req, res) {
    try {
      const { files } = req;
      const { name, description } = req.body;

      if (!name || !description) {
        return res
          .status(400)
          .send({ message: "Missing fields: name or description" });
      }

      if (!files || files.length === 0) {
        return res.status(400).send({ message: "No image files provided" });
      }

      const images = files.map((file) => file.path);

      const country = await Country.create({
        name,
        description,
        images,
      });

      return res.status(201).send({
        message: "Country added successfully",
        payload: country,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "ID not found" });
    }
    try {
      const deletedCountry = await Country.findByIdAndDelete(id);
      const cities = await City.find({ countryId: id });
      if (!deletedCountry) {
        return res.status(404).send({ message: "Country not found" });
      }
      cities.forEach(async (city) => {
        await deleteImage(city.images);
        await city.deleteOne();
      });
      await deleteImage(deletedCountry.images);
      return res.status(200).send({ message: "Country deleted successfully" });
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
      const country = await Country.findById(id);
      if (!country) {
        return res.status(404).send({ message: "Country not found" });
      }
      if (files) {
        const images = files.map((file) => file.path);
        country.images.push(...images);
      }
      if (name) {
        country.name = name;
      }
      if (description) {
        country.description;
      }
      await country.save();
      return res.status(200).send({
        message: "Country updated successfully",
        payload: country,
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
      const { modifiedCount, matchedCount } = await Country.updateOne(
        { _id: id },
        { $pull: { images: filename } }
      );
      if (!matchedCount) {
        return res.status(404).send({ message: "Country not found" });
      }
      if (!modifiedCount) {
        return res.status(400).send({ message: "Image not found" });
      }
      await deleteImage(filename);
      return res.status(200).send({ message: "Image deleted successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }
  // user
  async getTop(req, res) {
    try {
      const countries = await Country.find()
        .sort({ top: -1 })
        .limit(20)
        .populate("cities");
      return res.status(200).send({ message: "ok", payload: countries });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async getById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing country ID" });
    }
    try {
      const country = await Country.findById(id).populate("cities");
      if (!country) {
        return res.status(404).send({ message: "Country not found" });
      }
      return res.status(200).send({ message: "success", payload: country });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async search(req, res) {
    const { name } = req.query;
    if (!name || !name.trim()) {
      return res.status(400).send({ message: "Missing country name" });
    }
    try {
      const countries = await Country.find({
        name: { $regex: name, $options: "i" },
      });
      if (!countries) {
        return res.status(404).send({ message: "Countries not found" });
      }
      return res.status(200).send({ message: "ok", payload: countries });
    } catch (error) {
      return handleError(res, error);
    }
  }
}

module.exports = new CountryController();
