const router = require("express").Router();
const { trip } = require("../controllers/");
const { TripValidator } = require("../validators/");
const { isAuth, upload } = require("../middlewares/");

router.get("/", isAuth, trip.getMyTrips.bind(trip));
router.get("/:id", isAuth, TripValidator.getTrip, trip.getTrip.bind(trip));
router.get(
  "/all/:id",
  isAuth,
  TripValidator.getAllTrips,
  trip.getAllTrips.bind(trip)
);
router.post("/", isAuth, TripValidator.add, trip.add.bind(trip));
router.post(
  "/:id/cover",
  isAuth,
  upload.single("cover"),
  TripValidator.addCoverImage,
  trip.addCoverImage.bind(trip)
);
router.patch(
  "/:id",
  isAuth,
  TripValidator.togglePrivate,
  trip.togglePrivate.bind(trip)
);
router.put("/:id", isAuth, TripValidator.update, trip.update.bind(trip));
router.delete(
  "/:id/cover",
  isAuth,
  TripValidator.removeCoverImage,
  trip.removeCoverImage.bind(trip)
);
router.delete("/:id", isAuth, TripValidator.delete, trip.delete.bind(trip));
module.exports = router;
