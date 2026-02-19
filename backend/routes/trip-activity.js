const router = require("express").Router();
const { tripActivity } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const validate = require("../middlewares/validator");
const { id } = require("../schemas/common.schema");
const {
  addSchema,
  addNightSchema,
  updateSchema,
} = require("../schemas/trip-activity.schema");
router.get(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true, withUserRole: true }),
  tripActivity.activitiesByTripDayId.bind(tripActivity),
);
router.get(
  "/all/:id",
  isAuth,
  validate({ params: id }, { withUserId: true, withUserRole: true }),
  tripActivity.activityById.bind(tripActivity),
);
router.post(
  "/",
  isAuth,
  validate({ body: addSchema }, { withUserId: true }),
  tripActivity.addActivity.bind(tripActivity),
);
router.post(
  "/night",
  isAuth,
  validate({ body: addNightSchema }, { withUserId: true }),
  tripActivity.addNightActivity.bind(tripActivity),
);
router.patch(
  "/:id",
  isAuth,
  validate({ params: id, body: updateSchema }, { withUserId: true }),
  tripActivity.updateActivity.bind(tripActivity),
);
router.delete(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  tripActivity.deleteActivity.bind(tripActivity),
);

module.exports = router;
