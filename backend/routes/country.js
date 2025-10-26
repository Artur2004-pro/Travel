const router = require("express").Router();
const countryController = require("../controllers/country.js");
const upload = require("../middlewares/image-upload.js");
const isAdmin = require("../middlewares/is-admin.js");

const maxUploadSize = 5;
router.get("/", countryController.getAll);
router.post(
  "/add",
  isAdmin,
  upload.array("country", maxUploadSize),
  countryController.add.bind(countryController)
);
router.patch(
  "/update-text",
  isAdmin,
  countryController.updateText.bind(countryController)
);
router.patch(
  "/:id/photos",
  isAdmin,
  countryController.addPhotos.bind(countryController)
);
router.delete(
  "/:id",
  isAdmin,
  countryController.delete.bind(countryController)
);
router.delete(
  "/:id/photos",
  isAdmin,
  countryController.deletePhoto.bind(countryController)
);
module.exports = router;
