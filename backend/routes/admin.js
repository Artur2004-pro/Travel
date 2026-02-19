const router = require("express").Router();
const { admin } = require("../controllers/");
const { isAuth, isAdmin } = require("../middlewares/");
const { beAdminSchema } = require("../schemas/admin.schema");
const validate = require("../middlewares/validator");

router.post(
  "/be-admin",
  isAuth,
  validate({ body: beAdminSchema }, { withUserId: true, withUserRole: true }),
  admin.beAdmin.bind(admin),
);
router.get("/stats", isAuth, isAdmin, admin.getStatistics.bind(admin));

module.exports = router;
