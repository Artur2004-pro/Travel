const router = require("express").Router();
const { post } = require("../controllers/");
const { isAuth } = require("../middlewares/");

router.post("/:id", isAuth, post.add);
router.patch("/:id", isAuth, post.like);
router.delete("/:id", isAuth, post.delete);
router.delete("/:id/photos", isAuth, post.deletePhoto);

module.exports = router;
