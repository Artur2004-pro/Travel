const router = require("express").Router();
const { auth } = require("../controllers/");
const { AuthValidator } = require("../validators/");
// const { forgotPassword } = require("../middlewares/");

router.post("/signup", AuthValidator.signup, auth.signup.bind(auth));
router.post(
  "/verify-signup",
  AuthValidator.verifyCode,
  auth.verifyCode.bind(auth)
);
router.post(
  "/resend-verification",
  AuthValidator.resendVerification,
  auth.resendVerification.bind(auth)
);
router.post(
  "/forgot-password",
  AuthValidator.forgotPassword,
  auth.forgotPassword.bind(auth)
);
router.post(
  "/forgot-password/update",
  AuthValidator.forgotPasswordUpdate,
  auth.forgotPasswordUpdate.bind(auth)
);
router.post("/login", AuthValidator.login, auth.login.bind(auth));

module.exports = router;
