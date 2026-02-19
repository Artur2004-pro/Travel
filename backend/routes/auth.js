const router = require("express").Router();
const { auth } = require("../controllers/");
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
  validate({ body: signupSchema }),
  auth.signup.bind(auth),
);
router.post(
  "/verify-signup",
  validate({ body: verifyCodeSchema }),
  auth.verifyCode.bind(auth),
);
router.post(
  "/resend-verification",
  validate({ body: resendVerificationSchema }),
  auth.resendVerification.bind(auth),
);
router.post(
  "/forgot-password",
  validate({ body: forgotPasswordSchema }),
  auth.forgotPassword.bind(auth),
);
router.post(
  "/forgot-password/update",
  validate({ body: forgotPasswordUpdateSchema }),
  auth.forgotPasswordUpdate.bind(auth),
);
router.post("/login", validate({ body: loginSchema }), auth.login.bind(auth));

module.exports = router;
