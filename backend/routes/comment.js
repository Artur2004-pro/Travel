const router = require("express").Router();
const { comment } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const { CommentValidator } = require("../validators/");

router.post("/:postId", isAuth, CommentValidator.add, comment.add);
router.patch("/like/:id", isAuth, CommentValidator.like, comment.like);
router.delete("/:id", isAuth, CommentValidator.delete, comment.delete);

module.exports = router;
