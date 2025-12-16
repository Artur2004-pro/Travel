const router = require("express").Router();
const { city } = require("../controllers/");
const { isAuth, isAdmin, upload } = require("../middlewares/");
const { CityValidator } = require("../validators/");
// admin
router.get("/search", CityValidator.search, city.search.bind(city));
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
  CityValidator.update,
  city.update.bind(city)
);

router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  CityValidator.deletePhoto,
  city.deletePhoto.bind(city)
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  CityValidator.delete,
  city.delete.bind(city)
);

// user
router.get("/top", city.getTop.bind(city));
router.get("/:id", CityValidator.getCity, city.getCity.bind(city));
router.get("/all/:id", CityValidator.byCountryId, city.byCountryId.bind(city));
module.exports = router;
