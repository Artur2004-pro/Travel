const router = require("express").Router();
const { metaData } = require("../controllers");
const validate = require("../middlewares/validator");
const { queryNameSchema } = require("../schemas/metadata.schema");

router.get(
  "/hotels",
  validate({ query: queryNameSchema }),
  metaData.hotels.bind(metaData),
);
router.get(
  "/activities",
  validate({ query: queryNameSchema }),
  metaData.activities.bind(metaData),
);
router.get(
  "/night-life",
  validate({ query: queryNameSchema }),
  metaData.nightLife.bind(metaData),
);

module.exports = router;
