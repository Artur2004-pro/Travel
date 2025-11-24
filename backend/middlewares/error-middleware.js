function multerError(err, req, res, next) {
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({ error: "File too large" });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).send({ error: "Too many files" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send({ error: "Unexpected file field" });
    }
    return res.status(400).send({ error: err.message });
  }
  next(err);
}

module.exports = multerError;
