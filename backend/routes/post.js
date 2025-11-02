const router = require("express").Router();
const { post } = require("../controllers/");
const { isAuth, upload } = require("../middlewares/");

router.post("/:id", isAuth, upload.array("post"), post.add);
router.put("/:id", isAuth, upload.array("post"), post.update);
router.patch("/:id", isAuth, post.like);
router.delete("/:id", isAuth, post.delete);
router.delete("/:id/photos", isAuth, post.deletePhoto);

module.exports = router;
