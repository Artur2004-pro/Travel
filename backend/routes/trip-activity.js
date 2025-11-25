const router = require("express").Router();
const { tripActivity } = require("../controllers/");
const { TripActivityValidator } = require("../validators/");
const { isAuth } = require("../middlewares/");

router.get(
  "/:id",
  isAuth,
  TripActivityValidator.activitiesByTripDayId,
  tripActivity.activitiesByTripDayId.bind(tripActivity)
);
router.get(
  "/all/:id",
  isAuth,
  TripActivityValidator.activityById,
  tripActivity.activityById.bind(tripActivity)
);
router.post(
  "/",
  isAuth,
  TripActivityValidator.addActivity,
  tripActivity.addActivity.bind(tripActivity)
);
router.post(
  "/night",
  isAuth,
  TripActivityValidator.addNightActivity,
  tripActivity.addNightActivity.bind(tripActivity)
);
router.patch(
  "/:id",
  isAuth,
  TripActivityValidator.updateActivity,
  tripActivity.updateActivity.bind(tripActivity)
);
router.delete(
  "/:id",
  isAuth,
  TripActivityValidator.deleteActivity,
  tripActivity.deleteActivity.bind(tripActivity)
);

module.exports = router;
