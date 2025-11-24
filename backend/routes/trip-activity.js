const router = require("express").Router();
const { tripActivity } = require("../controllers/");
const { TripActivityValidator } = require("../validators/");
const { isAuth } = require("../middlewares/");

router.get(
  "/:id",
  isAuth,
  TripActivityValidator.activitiesByTripDayId,
  tripActivity.activitiesByTripDayId
);
router.get(
  "/all/:id",
  isAuth,
  TripActivityValidator.activityById,
  tripActivity.activityById
);
router.post(
  "/",
  isAuth,
  TripActivityValidator.addActivity,
  tripActivity.addActivity
);
router.post(
  "/night",
  isAuth,
  TripActivityValidator.addNightActivity,
  tripActivity.addNightActivity
);
router.patch(
  "/:id",
  isAuth,
  TripActivityValidator.updateActivity,
  tripActivity.updateActivity
);
router.delete(
  "/:id",
  isAuth,
  TripActivityValidator.deleteActivity,
  tripActivity.deleteActivity
);
router.module.exports = router;
