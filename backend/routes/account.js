const router = require("express").Router();
const accountController = require("../controllers/account.js");
router.post("/update-password", accountController.updatePassword);
router.post("/update-username", accountController.updateUsername);

module.exports = router;
