function handleError(res, err) {
  let statusCode = 500;
  let message = "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = errors.join(", ");
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} "${err.keyValue[field]}" already exists`;
  } else if (err.statusCode && err.message) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid or expired token";
  } else if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = err.message || "Access denied";
  }

  return res.status(statusCode).send({ success: false, message });
}

module.exports = handleError;
