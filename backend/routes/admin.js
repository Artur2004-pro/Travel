const router = require("express").Router();
const { admin } = require("../controllers/");
const { isAuth, isAdmin } = require("../middlewares/");

router.post("/be-admin", isAuth, admin.beAdmin.bind(admin));
router.get("/stats", isAuth, isAdmin, admin.getStatistics.bind(admin));

module.exports = router;
