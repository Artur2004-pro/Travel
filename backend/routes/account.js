const isAuth = require("../middlewares/is-authenticated.js");
const router = require("express").Router();
const accountController = require("../controllers/account.js");

router.get("/", isAuth, accountController.getAccount);
router.post("/update-password", isAuth, accountController.updatePassword);
router.post("/update-username", isAuth, accountController.updateUsername);

module.exports = router;
