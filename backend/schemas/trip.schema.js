const { z } = require("zod");
const { idSchema } = require("./common.schema");

module.exports = {
  addSchema: z.object({
    startDate: z.coerce.date("Invalid startDate"),
    endDate: z.coerce.date("Invalid endDate"),
    title: z.string().nonempty("Missing title"),
    description: z.string().nonempty("Missing description").optional(),
    countryId: idSchema,
    isPrivate: z.coerce.boolean(),
  }),
  updateSchema: z.object({
    startDate: z.coerce.date("Invalid startDate").optional(),
    endDate: z.coerce.date("Invalid endDate").optional(),
    title: z.string().nonempty("Missing title").optional(),
    description: z.string().nonempty("Missing description").optional(),
  }),
};
