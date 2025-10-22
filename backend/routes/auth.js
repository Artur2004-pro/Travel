const router = require("express").Router();
const authController = require("../controllers/auth.js");
const isAuth = require("../middlewares/is-authenticated.js");

router.post("/signup", authController.signup.bind(authController));
router.post(
  "/resend-verification",
  authController.resendVerification.bind(authController)
);
router.post(
  "/forgot/password",
  authController.forgotPassword.bind(authController)
);
router.post("/login", authController.login);

module.exports = router;
