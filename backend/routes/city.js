const router = require("express").Router();
const cityController = require("../controllers/city.js");
const upload = require("../middlewares/image-upload.js");
const isAuth = require("../middlewares/is-authenticated.js");
const isAdmin = require("../middlewares/is-admin.js");

// admin
const maxImageCount = 5;
router.post(
  "/:countryId",
  isAuth,
  isAdmin,
  upload.array("city", maxImageCount),
  cityController.add.bind(cityController)
);
router.patch(
  "/:id/update",
  isAuth,
  isAdmin,
  upload.array("city", maxImageCount),
  cityController.update.bind(cityController)
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  cityController.delete.bind(cityController)
);
router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  cityController.deletePhoto.bind(cityController)
);

// user
router.get("/:id", cityController.getCity.bind(cityController));
router.get("/all/:countryId", cityController.getCities.bind(cityController));
module.exports = router;
