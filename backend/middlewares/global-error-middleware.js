const { HttpStatusCode } = require("axios");
const { ZodError } = require("zod");
const mongoose = require("mongoose");
const mapStatusToCode = require("../helpers/utilities/map-status");
const { sendError } = require("../helpers/utilities/api-response");
const axios = require("axios");
const env = require("../helpers/utilities/env");

function errorHandler(err, req, res, next) {
  console.error(err);
  const isProd = env.NODE_ENV === "production";
  const statusCode = err.statusCode || 500;
  let status = 500;
  let code = "INTERNAL_ERROR";
  let message = "Something went wrong";
  let fields = undefined;
  let stack = undefined;

  if (err instanceof ZodError) {
    status = HttpStatusCode.BadRequest;
    code = mapStatusToCode(status);
    fields = err.flatten().fieldErrors;
    stack = err.stack || undefined;
    message = "Validation failed";
  } else if (
    mongoose.Error.ValidationError &&
    err instanceof mongoose.Error.ValidationError
  ) {
    // Mongoose Validation Error
    status = HttpStatusCode.BadRequest;
    code = mapStatusToCode(status);
    fields = {};
    for (const key in err.errors) {
      fields[key] = err.errors[key].message;
    }
    message = "Database validation failed";
    stack = err.stack || undefined;
  } else if (
    mongoose.Error.CastError &&
    err instanceof mongoose.Error.CastError
  ) {
    // Mongoose Cast Error (invalid ObjectId, etc.)
    status = HttpStatusCode.BadRequest;
    code = mapStatusToCode(status);
    message = `Invalid value for ${err.path}: ${err.value}`;
    stack = err.stack || undefined;
  } else if (axios.isAxiosError(err)) {
    status = err.response?.status ?? 500;
    code = mapStatusToCode(status);
    stack = err.stack || undefined;
    message =
      err.response?.data?.message ||
      err.response?.data?.error?.message ||
      "Upstream service error";
  } else if (typeof err === "object" && err !== null && "status" in err) {
    status = err.status;
    code = mapStatusToCode(status);
    message =
      "message" in err && typeof err.message === "string"
        ? err.message
        : message;
  } else if (err instanceof Error) {
    stack = err.stack || undefined;
    message = err.message;
  }

  stack = isProd ? undefined : stack;

  return sendError(res, code, message, status, fields, stack);
}

module.exports = errorHandler;
