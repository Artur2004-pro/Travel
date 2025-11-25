const router = require("express").Router();
const { post } = require("../controllers/");
const { isAuth, upload } = require("../middlewares/");
const { PostValidator } = require("../validators/");

router.post("/:id", isAuth, upload.array("post"), PostValidator.add, post.add);
router.put(
  "/:id",
  isAuth,
  upload.array("post"),
  PostValidator.update,
  post.update
);
router.patch("/:id", isAuth, PostValidator.like, post.like);
router.delete("/:id", isAuth, PostValidator.delete, post.delete);
router.delete(
  "/:id/photos",
  isAuth,
  PostValidator.deletePhoto,
  post.deletePhoto
);

module.exports = router;
