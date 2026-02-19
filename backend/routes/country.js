const router = require("express").Router();
const { country } = require("../controllers/");
const { upload, isAuth, isAdmin } = require("../middlewares/");
const validate = require("../middlewares/validator");
const { multerFiles, id } = require("../schemas/common.schema");
const {
  addSchema,
  deletePhotoSchema,
  updateSchema,
} = require("../schemas/coutry.schema");

router.get("/", country.getTop.bind(country));
router.get("/search", country.search.bind(country));
router.get("/:id", validate({ params: id }), country.getById.bind(country));
router.post(
  "/",
  isAuth,
  isAdmin,
  upload.array("country"),
  validate({ body: addSchema, files: multerFiles }),
  country.add.bind(country),
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  upload.array("country"),
  validate({ body: updateSchema, files: multerFiles, params: id }),
  country.update.bind(country),
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  validate({ params: id }),
  country.delete.bind(country),
);
router.delete(
  "/:id/photos",
  isAuth,
  isAdmin,
  validate({ params: id, query: deletePhotoSchema }),
  country.deletePhoto.bind(country),
);
module.exports = router;
