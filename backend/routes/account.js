const router = require("express").Router();
const { isAdmin, isAuth } = require("../middlewares/");
const { account } = require("../controllers/");

router.get("/", isAuth, account.getAccount);
router.get("/user/:id", isAuth, isAdmin, account.getSpecAccount);
router.get("/user", isAuth, isAdmin, account.search);
router.post("/update-password", isAuth, account.updatePassword);
router.post("/update-username", isAuth, account.updateUsername);
router.patch("/configure/:id", isAuth, isAdmin, account.configureAccount);
router.patch("/role/:id", isAuth, isAdmin, account.role);
module.exports = router;
