const router = require("express").Router();
const { admin } = require("../controllers/");
const { isAuth } = require("../middlewares/");

router.post("/be-admin", isAuth, admin.beAdmin.bind(admin));

module.exports = router;
