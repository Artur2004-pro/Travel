const router = require("express").Router();
const { auth } = require("../controllers/");
const { AuthValidator } = require("../validators/");
// const { forgotPassword } = require("../middlewares/");
const validate = require("../middlewares/validator");
const {
  signupSchema,
  verifyCodeSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  forgotPasswordUpdateSchema,
  loginSchema,
} = require("../schemas/auth");

router.post(
  "/signup",
  validate({ body: signupSchema }, { mergeTo: "body" }),
  auth.signup.bind(auth),
);
router.post(
  "/verify-signup",
  validate({ body: verifyCodeSchema }, { mergeTo: "body" }),
  auth.verifyCode.bind(auth),
);
router.post(
  "/resend-verification",
  validate({ body: resendVerificationSchema }, { mergeTo: "body" }),
  // AuthValidator.resendVerification,
  auth.resendVerification.bind(auth),
);
router.post(
  "/forgot-password",
  validate({ body: forgotPasswordSchema }, { mergeTo: "body" }),
  // AuthValidator.forgotPassword,
  auth.forgotPassword.bind(auth),
);
router.post(
  "/forgot-password/update",
  validate({ body: forgotPasswordUpdateSchema }, { mergeTo: "body" }),
  // AuthValidator.forgotPasswordUpdate,
  auth.forgotPasswordUpdate.bind(auth),
);
router.post(
  "/login",
  validate({ body: loginSchema }, { mergeTo: "body" }),
  // AuthValidator.login,
  auth.login.bind(auth),
);

module.exports = router;
