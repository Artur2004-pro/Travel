const { z } = require("zod");

module.exports = {
  addSchema: z.object({
    name: z.string().nonempty("Missing name"),
    description: z.string().nonempty("Missing description"),
  }),
  deletePhotoSchema: z.object({
    filename: z.string().nonempty("Missing filename"),
  }),
  updateSchema: z.object({
    description: z.string().nonempty("Missing description"),
  }),
};
