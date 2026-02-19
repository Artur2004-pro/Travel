const router = require("express").Router();
const { comment } = require("../controllers/");
const { isAuth } = require("../middlewares/");
const validate = require("../middlewares/validator");
const { addSchemaParams, addSchemaBody } = require("../schemas/comment.schema");
const { id } = require("../schemas/common.schema");

router.post(
  "/:postId",
  isAuth,
  validate(
    { params: addSchemaParams, body: addSchemaBody },
    { withUserId: true },
  ),
  comment.add.bind(comment),
);
router.patch(
  "/like/:id",
  isAuth,
  validate({ params: id }, { withUserId: true }),
  comment.like.bind(comment),
);
router.delete(
  "/:id",
  isAuth,
  validate({ params: id }, { withUserRole: true, withUserId: true }),
  comment.delete.bind(comment),
);

module.exports = router;
