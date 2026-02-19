const { z } = require("zod");
const { idSchema } = require("./common.schema");

module.exports = {
  tripDaysByTripIdSchema: z.object({
    tripId: idSchema,
  }),
  createTripDaySchema: z.object({
    tripId: idSchema,
    order: z.number().int(),
    cityId: idSchema,
    hotelId: z.string().nonempty("Missing hotel id").optional(),
  }),
  updateTripDaySchema: z.object({
    hotelId: z.string().nonempty("Missing hotel id").optional(),
    cityId: idSchema,
  }),
};
