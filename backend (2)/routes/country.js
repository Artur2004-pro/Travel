const router = require("express").Router();
const { country } = require("../controllers/");
const { upload, isAuth, isAdmin } = require("../middlewares/");
const { CountryValidator } = require("../validators/");

router.get("/", country.getTop);
router.get("/search", country.search);
router.get("/:id", CountryValidator.getById, country.getById);
router.post(
  "/",
  isAuth,
  isAdmin,
  upload.array("country"),
  CountryValidator.add,
  country.add
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  upload.array("country"),
  CountryValidator.update,
  country.update
);
router.delete("/:id", isAuth, isAdmin, CountryValidator.delete, country.delete);
router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  CountryValidator.deletePhoto,
  country.deletePhoto
);
module.exports = router;
