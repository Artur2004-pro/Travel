const { z } = require("zod");
const { fileSchema } = require("./common.schema");

module.exports = {
  addSchema: z.object({
    name: z.string().nonempty("Missing name"),
    description: z.string().nonempty("Missing description"),
    countryName: z.string().nonempty("Missing country name"),
  }),
  updateBodySchema: z.object({
    description: z.string().nonempty("Missing description"),
  }),
  deletePhotoSchema: z.object({
    filename: z.string().nonempty("Missing filename"),
  }),
  searchSchmea: z.object({
    name: z.string().nonempty("Missing search params"),
  }),
};
