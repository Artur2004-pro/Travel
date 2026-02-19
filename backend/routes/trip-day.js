const router = require("express").Router();
const { tripDay } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const { id } = require("../schemas/common.schema");
const {
  tripDaysByTripIdSchema,
  createTripDaySchema,
  updateTripDaySchema,
} = require("../schemas/trip-day.schema");
const validate = require("../middlewares/validator");

router.get(
  "/all/:tripId",
  isAuth,
  validate({ params: tripDaysByTripIdSchema }, { withUserId: true }),
  tripDay.tripDaysByTripId.bind(tripDay),
);
router.get(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  tripDay.tripDayById.bind(tripDay),
);
router.post(
  "/",
  isAuth,
  validate({ body: createTripDaySchema }, { withUserId: true }),
  tripDay.createTripDay.bind(tripDay),
);
router.patch(
  "/:id",
  isAuth,
  validate({ body: updateTripDaySchema, params: id }, { withUserId: true }),
  tripDay.updateTripDay.bind(tripDay),
);
router.delete(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  tripDay.deleteTripDay.bind(tripDay),
);

module.exports = router;
