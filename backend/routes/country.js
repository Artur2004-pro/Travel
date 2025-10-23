const router = require("express").Router();
const countryController = require("../controllers/country.js");

router.get("/", countryController.getAll);

module.exports = router;
