const router = require("express").Router();
const { tripDay } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const { TripDayValidator } = require("../validators");

router.get(
  "/all/:tripId",
  isAuth,
  TripDayValidator.tripDaysByTripId,
  tripDay.tripDaysByTripId
);
router.get("/:id", isAuth, TripDayValidator.tripDayById, tripDay.tripDayById);
router.post("/", isAuth, TripDayValidator.createTripDay, tripDay.createTripDay);
router.patch(
  "/:id",
  isAuth,
  TripDayValidator.updateTripDay,
  tripDay.updateTripDay
);
router.delete(
  "/:id",
  isAuth,
  TripDayValidator.deleteTripDay,
  tripDay.deleteTripDay
);

module.exports = router;
