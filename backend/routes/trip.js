const router = require("express").Router();
const { trip } = require("../controllers/");
// const { TripValidator } = require("../validators/");
const { isAuth, upload } = require("../middlewares/");
const validate = require("../middlewares/validator");
const { id, multerFile } = require("../schemas/common.schema");
const { addSchema, updateSchema } = require("../schemas/trip.schema");

router.get("/", isAuth, trip.getMyTrips.bind(trip));
router.get(
  "/:id/pdf",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  trip.getPdf.bind(trip),
);
router.get(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  trip.getTrip.bind(trip),
);
router.get(
  "/all/:id",
  isAuth,
  validate({ params: id }, { withUserId: true, withUserRole: true }),
  trip.getAllTrips.bind(trip),
);
router.post(
  "/",
  isAuth,
  validate({ body: addSchema }, { withUserId: true }),
  trip.add.bind(trip),
);
router.post(
  "/:id/cover",
  isAuth,
  upload.single("cover"),
  validate({ file: multerFile }, { withUserId: true }),
  trip.addCoverImage.bind(trip),
);
router.patch(
  "/:id/complete",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  trip.toggleComplete.bind(trip),
);
router.patch(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  trip.togglePrivate.bind(trip),
);
router.put(
  "/:id",
  isAuth,
  validate({ params: id, body: updateSchema }, { withUserId: true }),
  trip.update.bind(trip),
);
router.delete(
  "/:id/cover",
  isAuth,
  validate({ params: id }, { withUserId: true, withUserRole: true }),
  trip.removeCoverImage.bind(trip),
);

router.delete(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  trip.delete.bind(trip),
);
module.exports = router;
