const { ZodError } = require("zod");

/**
 * schemas: {
 *   body?: ZodSchema,
 *   query?: ZodSchema,
 *   params?: ZodSchema
 * }
 *
 * options:
 *   mergeTo: "body" | "query" | "params"
 */
const validate = (schemas, options = {}) => {
  const mergeTo = options.mergeTo || "body";

  return (req, res, next) => {
    try {
      const collected = {};

      if (schemas.body) {
        const parsedBody = schemas.body.parse(req.body);
        Object.assign(collected, parsedBody);
      }

      if (schemas.query) {
        const parsedQuery = schemas.query.parse(req.query);
        Object.assign(collected, parsedQuery);
      }

      if (schemas.params) {
        const parsedParams = schemas.params.parse(req.params);
        Object.assign(collected, parsedParams);
      }
      if (options.withUserId) {
        collected.userId = req.user?._id.toString();
      }
      // վերջում՝ բոլորը մի տեղ
      req[mergeTo] = collected;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: err.errors,
        });
      }

      next(err);
    }
  };
};

module.exports = validate;
