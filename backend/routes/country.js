const router = require("express").Router();
const { country } = require("../controllers/");
const { upload, isAuth, isAdmin } = require("../middlewares/");

const maxUploadSize = 5;
router.get("/", country.getAll);
router.get("/search", country.search);
router.get("/:id", country.getById);
router.post(
  "/add",
  isAuth,
  isAdmin,
  upload.array("country", maxUploadSize),
  country.add
);
router.patch(
  "/:id",
  isAuth,
  isAdmin,
  upload.array("country", maxUploadSize),
  country.update
);
router.delete("/:id", isAuth, isAdmin, country.delete);
router.delete("/:id/photos", isAuth, isAdmin, country.deletePhoto);
module.exports = router;
