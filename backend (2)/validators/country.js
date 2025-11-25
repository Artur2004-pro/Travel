class CountryValidator {
  static add(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(400)
        .send({ message: "Missing fields: name or description" });
    }
    const { files } = req;
    if (!files || !files.length) {
      return res.status(400).send({ message: "No image files provided" });
    }
    const images = files.map((file) => file.path);
    req.body = { name, description, images };
    next();
  }
  static delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "ID not found" });
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
    if (!files?.length && !description) {
      return res.status(400).send({ message: "Missing fields" });
    }
    const images = files.map((file) => file.path);
    req.body = { images, id, description };
    next();
  }
  static deletePhoto(req, res, next) {
    const { id } = req.params;
    const { filename } = req.query;
    if (!id || !filename) {
      return res.status(400).send({ message: "Missing fields" });
    }
    req.body = { id, filename };
    next();
  }
  static getById(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing country ID" });
    }
    next();
  }
  static search(req, res, next) {
    const { name } = req.query;
    if (!name || !name.trim()) {
      return res.status(400).send({ message: "Missing country name" });
    }
    next();
  }
}

module.exports = CountryValidator;
