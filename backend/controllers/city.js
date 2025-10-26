const { City } = require("../models/");
const deleteImage = require("../helpers/delete-image.js");

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

      return res.status(201).send({
        message: "City added successfully",
        payload: { data: city },
      });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing ID" });
    }
    try {
      const city = await City.findById(id);
      if (!city) {
        return res.status(404).send({ message: "City not found" });
      }
      deleteImage(city.images);
      await city.deleteOne();
      return res.status(200).send({ message: "City deleted successfully" });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
  async updateText(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id || (!name && !description)) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const city = await City.findById(id);
      if (!city) {
        return res.status(404).send({ message: "City not found" });
      }
      if (name && name.trim()) {
        city.name = name;
      }
      if (description && description.trim()) {
        city.description = description;
      }
      await city.save();
      return res
        .status(200)
        .send({ message: "City updated successfully", payload: { city } });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  async addPhotos(req, res) {
    const { files } = req;
    const { id } = req.params;
    if (!files || !id) {
      return res.status(400).send({ message: "Missing fields" });
    }
    const images = files.map((file) => file.path);
    const city = await City.findById(id);
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    city.images.push(...images);
    await city.save();
    return res
      .status(200)
      .send({ message: "City images updated successfully", payload: { city } });
  }

  async deletePhoto(req, res) {
    const { id } = req.params;
    const { filename } = req.body;
    if (!id || !filename) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const city = await City.findById(id);
      if (!city) {
        return res.status(404).send({ message: "City not found" });
      }
      deleteImage(filename),
        (city.images = city.images.filter((img) => img != filename));
      await city.save();
      return res
        .status(200)
        .send({ message: "Image deleted", payload: { city } });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  // user
  async getCity(req, res) {}
  async getCities(req, res) {}
}

module.exports = new CityController();
