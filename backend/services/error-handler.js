class ServiceError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = "ServiceError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

class ErrorHandler {
  static normalize(error) {
    if (!error) return new ServiceError("Unknown error");

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return new ServiceError(messages.join(", "), 400);
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return new ServiceError(`${field} already exists`, 409);
    }

    if (error.name === "CastError") {
      return new ServiceError(`Invalid ${error.path}: ${error.value}`, 400);
    }

    return new ServiceError(error.message || "Internal server error", 500);
  }
}

module.exports = { ErrorHandler, ServiceError };
