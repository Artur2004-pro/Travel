const { z } = require("zod");

module.exports = {
  beAdminSchema: z.object({ adminToken: z.string().nonempty("Missing Token") }),
};
