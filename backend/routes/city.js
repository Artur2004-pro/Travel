const router = require("express").Router();
const { city } = require("../controllers/");
const { isAuth, isAdmin, upload } = require("../middlewares/");
const validate = require("../middlewares/validator");
const {
  searchSchmea,
  addSchema,
  updateBodySchema,
  deletePhotoSchema,
} = require("../schemas/city.schema");
const { id, multerFiles } = require("../schemas/common.schema");

// admin
router.get(
  "/search",
  validate({ query: searchSchmea }),
  city.search.bind(city),
);
router.post(
  "/",
  isAuth,
  isAdmin,
  upload.array("city"),
  validate({ params: id, body: addSchema, files: multerFiles }),
  city.add.bind(city),
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  upload.array("city"),
  validate({ body: updateBodySchema, params: id, files: multerFiles }),
  city.update.bind(city),
);

router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  validate({ params: id, query: deletePhotoSchema }),
  city.deletePhoto.bind(city),
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  validate({ params: id }),
  city.delete.bind(city),
);

// user
router.get("/top", city.getTop.bind(city));
router.get("/:id", validate({ params: id }), city.getCity.bind(city));
router.get("/all/:id", validate({ params: id }), city.byCountryId.bind(city));
module.exports = router;
