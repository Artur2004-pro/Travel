function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({
    success: false,
    message: err.message || "Something went wrong",
  });
}

module.exports = errorHandler;
