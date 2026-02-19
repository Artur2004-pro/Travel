const router = require("express").Router();
const { isAdmin, isAuth, upload } = require("../middlewares/");
const { account } = require("../controllers/");
const validate = require("../middlewares/validator");
const { id, multerFile } = require("../schemas/common.schema");
const {
  searchSchema,
  updatePasswordSchema,
  updateUsernameSchema,
  updateAvatarSchema,
} = require("../schemas/accout.schema");
router.get("/", isAuth, account.getAccount.bind(account));
router.get(
  "/user/:id",
  isAuth,
  isAdmin,
  validate({ params: id }),
  account.getSpecAccount.bind(account),
);
router.get(
  "/user",
  isAuth,
  isAdmin,
  validate({ query: searchSchema }),
  account.search.bind(account),
);
router.post(
  "/update-password",
  isAuth,
  validate({ body: updatePasswordSchema }, { withUserId: true }),
  account.updatePassword.bind(account),
);
router.post(
  "/update-username",
  isAuth,
  validate({ body: updateUsernameSchema }, { withUserId: true }),
  account.updateUsername.bind(account),
);
router.patch(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  validate(
    { body: updateAvatarSchema, file: multerFile },
    { withUserId: true },
  ),
  account.updateAvatar.bind(account),
);
router.patch(
  "/configure/:id",
  isAuth,
  isAdmin,
  validate({ params: id }, { withUserId: true }),
  account.configureAccount.bind(account),
);
router.patch(
  "/role/:id",
  isAuth,
  isAdmin,
  validate({ params: id }, { withUserId: true }),
  account.role.bind(account),
);
module.exports = router;
