class CityValidator {
  static add(req, res, next) {
    const { files } = req;
    const { name, description, countryName } = req.body;
    if (!name || !description || !countryName) {
      return res
        .status(400)
        .send({ message: "Missing fields: name or description" });
    }
    if (files || files.length) {
      return res.status(400).send({ message: "No image files provided" });
    }
    const images = files.map((file) => file.path);
    req.body = { images, name, description, countryName };
    next();
  }
  static delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing ID" });
    }
    next();
  }
  static update(req, res, next) {
    const { files } = req;
    const { id } = req.params;
    const { description } = req.body;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    if (!files && !description) {
      return res.status(400).send({ message: "Missing fields" });
    }
    const images = files && files.length ? files.map((file) => file.path) : [];
    const desc = description || "";
    req.body = { images, description: desc, id };
    next();
  }
  static deletePhoto(req, res, next) {
    const { id } = req.params;
    const { filename } = req.query;
    if (!id || !filename) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    req.body = { id, filename };
    next();
  }
  static search(req, res, next) {
    const { name } = req.query;
    if (!name) {
      return res.status(400).send({ message: "Missing search params" });
    }
    next();
  }
  static getCity(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing city id" });
    }
    next();
  }
}

module.exports = CityValidator;
