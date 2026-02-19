const { z } = require("zod");
const { idSchema } = require("./common.schema");

module.exports = {
  addSchemaParams: z.object({
    postId: idSchema,
  }),
  addSchemaBody: z.object({
    content: z.string().nonempty("Missing content"),
  }),
};
