const router = require("express").Router();
const { post } = require("../controllers/");
const { isAuth, upload } = require("../middlewares/");
const { PostValidator } = require("../validators/");

router.post(
  "/:id",
  isAuth,
  upload.array("post"),
  PostValidator.add,
  post.add.bind(post)
);
router.put(
  "/:id",
  isAuth,
  upload.array("post"),
  PostValidator.update,
  post.update.bind(post)
);
router.patch("/:id", isAuth, PostValidator.like, post.like.bind(post));
router.delete("/:id", isAuth, PostValidator.delete, post.delete.bind(post));
router.delete(
  "/:id/photos",
  isAuth,
  PostValidator.deletePhoto,
  post.deletePhoto.bind(post)
);

module.exports = router;
