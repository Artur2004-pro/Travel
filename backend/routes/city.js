const router = require("express").Router();
const { city } = require("../controllers/");
const { isAuth, isAdmin, upload } = require("../middlewares/");

// admin
const maxImageCount = 5;
router.post(
  "/:countryId",
  isAuth,
  isAdmin,
  upload.array("city", maxImageCount),
  city.add.bind(city)
);
router.patch(
  "/:id/update",
  isAuth,
  isAdmin,
  upload.array("city", maxImageCount),
  city.update.bind(city)
);

router.delete("/:id", isAuth, isAdmin, city.delete.bind(city));
router.delete("/:id/photos", isAuth, isAdmin, city.deletePhoto.bind(city));

// user
router.get("/:id", city.getCity.bind(city));
router.get("/all/:countryId", city.getCities.bind(city));
module.exports = router;
