const router = require("express").Router();
const { comment } = require("../controllers/");
const { isAuth } = require("../middlewares/");

router.post("/", isAuth, comment.add);
router.patch("/like", isAuth, comment.like);
router.delete("/", isAuth, comment.delete);

module.exports = router;
