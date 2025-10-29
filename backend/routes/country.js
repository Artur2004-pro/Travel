const router = require("express").Router();
const countryController = require("../controllers/country.js");
const upload = require("../middlewares/image-upload.js");
const isAuth = require("../middlewares/is-authenticated.js");
const isAdmin = require("../middlewares/is-admin.js");

const maxUploadSize = 5;
router.get("/", countryController.getAll);
router.get("/search", countryController.search);
router.get("/:id", countryController.getById);
router.post(
  "/add",
  isAuth,
  isAdmin,
  upload.array("country", maxUploadSize),
  countryController.add.bind(countryController)
);
router.patch(
  "/:id/update-text",
  isAuth,
  isAdmin,
  countryController.updateText.bind(countryController)
);
router.patch(
  "/:id/add-photos",
  isAuth,
  isAdmin,
  upload.array("country", maxUploadSize),
  countryController.addPhotos.bind(countryController)
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  countryController.delete.bind(countryController)
);
router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  countryController.deletePhoto.bind(countryController)
);
module.exports = router;
