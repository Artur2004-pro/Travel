const { z } = require("zod");
const { idSchema } = require("./common.schema");

module.exports = {
  addSchema: z.object({
    tripDayId: idSchema,
    cityId: idSchema,
    activityId: idSchema,
    notes: z.string().trim().optional(),
    cost: z.number().nonnegative().optional(),
  }),
  addNightSchema: z.object({
    tripDayId: idSchema,
    nightActivityId: idSchema,
    cityId: idSchema,
    notes: z.string().trim().optional(),
    cost: z.number().nonnegative().optional(),
  }),
  updateSchema: z.object({
    notes: z.string().trim().optional(),
    cost: z.number().nonnegative().optional(),
  }),
};
