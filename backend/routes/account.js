const router = require("express").Router();
const { isAdmin, isAuth, upload } = require("../middlewares/");
const { account } = require("../controllers/");
const { AccountValidator } = require("../validators/");

router.get("/", isAuth, account.getAccount.bind(account));
router.get(
  "/user/:id",
  isAuth,
  isAdmin,
  AccountValidator.getSpecAccount,
  account.getSpecAccount.bind(account)
);
router.get(
  "/user",
  isAuth,
  isAdmin,
  AccountValidator.search,
  account.search.bind(account)
);
router.post(
  "/update-password",
  isAuth,
  AccountValidator.updatePassword,
  account.updatePassword.bind(account)
);
router.post(
  "/update-username",
  isAuth,
  AccountValidator.updateUsername,
  account.updateUsername.bind(account)
);
router.patch(
  "/preferences",
  isAuth,
  AccountValidator.updateDefaultTripVisibility,
  account.updateDefaultTripVisibility.bind(account)
);
router.patch(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  AccountValidator.updateAvatar,
  account.updateAvatar.bind(account)
);
router.patch(
  "/configure/:id",
  isAuth,
  isAdmin,
  AccountValidator.configureAccount,
  account.configureAccount.bind(account)
);
router.patch(
  "/role/:id",
  isAuth,
  isAdmin,
  AccountValidator.role,
  account.role.bind(account)
);
module.exports = router;
