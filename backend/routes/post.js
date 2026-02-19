const router = require("express").Router();
const { post } = require("../controllers/");
const { isAuth, upload } = require("../middlewares/");
const validate = require("../middlewares/validator");
const { id, multerFiles } = require("../schemas/common.schema");
const {
  addSchema,
  updateSchema,
  deletePhotoSchema,
} = require("../schemas/post.schema");

router.get("/", isAuth, post.getAll.bind(post));
router.get("/:id", isAuth, validate({ params: id }), post.getById.bind(post));
router.post(
  "/",
  isAuth,
  upload.array("post"),
  validate({ body: addSchema, files: multerFiles }, { withUserId: true }),
  post.add.bind(post),
);
router.put(
  "/:id",
  isAuth,
  upload.array("post"),
  validate(
    { body: updateSchema, files: multerFiles, params: id },
    { withUserId: true },
  ),
  post.update.bind(post),
);
router.patch(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  post.like.bind(post),
);
router.delete(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserId: true, withUserRole: true }),
  post.delete.bind(post),
);
router.delete(
  "/:id/photos",
  isAuth,
  validate(
    { params: id, query: deletePhotoSchema },
    { withUserId: true, withUserRole: true },
  ),
  post.deletePhoto.bind(post),
);

module.exports = router;
