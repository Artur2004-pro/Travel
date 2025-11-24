const router = require("express").Router();
const { trip } = require("../controllers/");
const { TripValidator } = require("../validators/");
const { isAuth } = require("../middlewares/");

router.post("/", isAuth, TripValidator.add, trip.add.bind(trip));
router.patch("/:id", isAuth, TripValidator.update, trip.update.bind(trip));
module.exports = router;
