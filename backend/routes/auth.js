const router = require("express").Router();
const { auth } = require("../controllers/");
const { forgotPassword } = require("../middlewares/");

router.post("/signup", auth.signup.bind(auth));
router.post("/resend-verification", auth.resendVerification.bind(auth));
router.post("/forgot/password", auth.forgotPassword.bind(auth));
router.post(
  "/forgot-password/update",
  forgotPassword,
  auth.forgotPasswordUpdate.bind(auth)
);
router.post("/login", auth.login.bind(auth));

module.exports = router;
