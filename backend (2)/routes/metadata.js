const router = require("express").Router();
const { metaData } = require("../controllers");
const { MetaDataValidator } = require("../validators/");

router.get("/hotels", MetaDataValidator.queryName, metaData.hotels);
router.get("/activities", MetaDataValidator.queryName, metaData.activities);
router.get("/night-life", MetaDataValidator.queryName, metaData.nightLife);

module.exports = router;
