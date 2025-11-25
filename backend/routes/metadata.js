const router = require("express").Router();
const { metaData } = require("../controllers");
const { MetaDataValidator } = require("../validators/");

router.get(
  "/hotels",
  MetaDataValidator.queryName,
  metaData.hotels.bind(metaData)
);
router.get(
  "/activities",
  MetaDataValidator.queryName,
  metaData.activities.bind(metaData)
);
router.get(
  "/night-life",
  MetaDataValidator.queryName,
  metaData.nightLife.bind(metaData)
);

module.exports = router;
