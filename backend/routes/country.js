const router = require("express").Router();
const { country } = require("../controllers/");
const { upload, isAuth, isAdmin } = require("../middlewares/");
const { CountryValidator } = require("../validators/");

router.get("/", country.getTop.bind(country));
router.get("/search", country.search.bind(country));
router.get("/:id", CountryValidator.getById, country.getById.bind(country));
router.post(
  "/",
  isAuth,
  isAdmin,
  upload.array("country"),
  CountryValidator.add,
  country.add.bind(country)
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  upload.array("country"),
  CountryValidator.update,
  country.update.bind(country)
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  CountryValidator.delete,
  country.delete.bind(country)
);
router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  CountryValidator.deletePhoto,
  country.deletePhoto.bind(country)
);
module.exports = router;
