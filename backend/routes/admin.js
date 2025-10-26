const router = require("express").Router();
const jwt = require("jsonwebtoken");
const adminController = require("../controllers/admin.js");
const isAuth = require("../middlewares/is-authenticated.js");

router.post("/be-admin", isAuth, adminController.beAdmin.bind(adminController));

module.exports = router;
