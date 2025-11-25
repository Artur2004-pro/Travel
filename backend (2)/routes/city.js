const router = require("express").Router();
const { city } = require("../controllers/");
const { isAuth, isAdmin, upload } = require("../middlewares/");
const { CityValidator } = require("../validators/");
// admin
router.get("/search", city.search.bind(city));
router.post(
  "/",
  isAuth,
  isAdmin,
  upload.array("city"),
  CityValidator.add,
  city.add.bind(city)
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  upload.array("city"),
  city.update.bind(city)
);

router.delete("/:id/photos", isAuth, isAdmin, city.deletePhoto.bind(city));
router.delete("/:id", isAuth, isAdmin, city.delete.bind(city));

// user
router.get("/top", city.getTop.bind(city));
router.get("/:id", city.getCity.bind(city));

module.exports = router;
