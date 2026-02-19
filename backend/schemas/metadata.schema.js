const { z } = require("zod");

module.exports = {
  queryNameSchema: z.object({
    id: z.string().nonempty("missing field"),
  }),
};
