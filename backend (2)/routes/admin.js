const router = require("express").Router();
const { admin } = require("../controllers/");
const { isAuth, isAdmin } = require("../middlewares/");
const { AdminValidator } = require("../validators/");

router.post(
  "/be-admin",
  isAuth,
  AdminValidator.beAdmin,
  admin.beAdmin.bind(admin)
);
router.get("/stats", isAuth, isAdmin, admin.getStatistics.bind(admin));

module.exports = router;
