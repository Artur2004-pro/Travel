class MetaDataValidator {
  static queryName(req, res, next) {
    const { id } = req.query;
    if (!id || !id.trim()) {
      return res.status(400).send({ message: "Missing city name" });
    }
    next();
  }
}

module.exports = MetaDataValidator;
