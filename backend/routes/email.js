const router = require("express").Router();
const { email } = require("../controllers/");

router.get("/verify-email", email.verifyEmail);
router.get("/forgot-password", email.forgotPassword);

module.exports = router;
