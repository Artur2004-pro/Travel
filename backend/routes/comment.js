const router = require("express").Router();
const { comment } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const { CommentValidator } = require("../validators/");

router.post(
  "/:postId",
  isAuth,
  CommentValidator.add,
  comment.add.bind(comment)
);
router.patch(
  "/like/:id",
  isAuth,
  CommentValidator.like,
  comment.like.bind(comment)
);
router.delete(
  "/:id",
  isAuth,
  CommentValidator.delete,
  comment.delete.bind(comment)
);

module.exports = router;
