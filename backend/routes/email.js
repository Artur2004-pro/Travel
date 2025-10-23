const router = require("express").Router();
const emailController = require("../controllers/email.js")

router.get("/verify-email", emailController.verifyEmail)
router.get("/forgot-password", emailController.forgotPassword);

module.exports = router;