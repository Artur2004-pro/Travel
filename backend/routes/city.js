const router = require("express").Router();
const cityController = require("../controllers/city.js");

router.post("/:countryId", cityController.add.bind(cityController));
router.post("/:id/photos", cityController.addPhotos.bind(cityController));
router.patch("/:id/update-text", cityController.updateText.bind(cityController));
router.delete("/:id", cityController.delete.bind(cityController));
router.delete("/:id/photos", cityController.deletePhoto.bind(cityController));

module.exports = router;
