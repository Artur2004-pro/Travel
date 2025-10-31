const { Country, City } = require("../models/");
const deleteImage = require("../helpers/delete-image.js");

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
        payload: { data: country },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Server error", error: error.message });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "ID not found" });
    }
    try {
      const country = await Country.findById(id);
      const cities = await City.find({ countryId: id });
      if (!country) {
        return res.status(404).send({ message: "Country not found" });
      }
      cities.forEach(async (city) => {
        await deleteImage(city.images);
        await city.deleteOne();
      });
      await deleteImage(country.images);
      await country.deleteOne();
      return res.status(200).send({ message: "Country deleted successfully" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
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
        payload: { data: country },
      });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async deletePhoto(req, res) {
    const { id } = req.params;
    const { filename } = req.query;
    if (!id || !filename) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const country = await Country.findById(id);
      if (!country) {
        return res.status(404).send({ message: "Country not found" });
      }
      const deleted = await deleteImage(filename);
      if (!deleted) {
        return res.status(500).send({ message: "Internal server problem..." });
      }
      country.images = country.images.filter((img) => img != filename);
      await country.save();
      return res.status(200).send({ message: "Image deleted successfully" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  // user
  async getAll(req, res) {
    const countries = await Country.find({});
    return res.status(200).send({ message: "ok", payload: { countries } });
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
      return res.status(200).send({ message: "success", payload: { country } });
    } catch (error) {
      return res.status(400).send({ message: error.message });
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
      return res.status(200).send({ message: "ok", payload: { countries } });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new CountryController();
