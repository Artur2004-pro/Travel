class MetaDataValidator {
  static queryName(req, res, next) {
    const { name } = req.query;
    if (!name || !name.trim()) {
      return res.status(400).send({ message: "Missing city name" });
    }
    next();
  }
}

module.exports = MetaDataValidator;
