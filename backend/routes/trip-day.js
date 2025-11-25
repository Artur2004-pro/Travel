const router = require("express").Router();
const { tripDay } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const { TripDayValidator } = require("../validators");

router.get(
  "/all/:tripId",
  isAuth,
  TripDayValidator.tripDaysByTripId,
  tripDay.tripDaysByTripId.bind(tripDay)
);
router.get(
  "/:id",
  isAuth,
  TripDayValidator.tripDayById,
  tripDay.tripDayById.bind(tripDay)
);
router.post(
  "/",
  isAuth,
  TripDayValidator.createTripDay,
  tripDay.createTripDay.bind(tripDay)
);
router.patch(
  "/:id",
  isAuth,
  TripDayValidator.updateTripDay,
  tripDay.updateTripDay.bind(tripDay)
);
router.delete(
  "/:id",
  isAuth,
  TripDayValidator.deleteTripDay,
  tripDay.deleteTripDay.bind(tripDay)
);

module.exports = router;
