const mongoose = require("mongoose");
const cityMiddleware = require("./middlewares/city");

const citySchema = new mongoose.Schema({
  name: { type: String, required: [true, "City name is required"] },
  description: { type: String },
  images: [{ type: String }],
  countryId: {
    type: mongoose.Types.ObjectId,
    ref: "Country",
    required: [true, "Country id is required"],
  },
  top: { type: Number, default: 0 },
  lat: Number,
  lon: Number,
});

citySchema.plugin(cityMiddleware);

module.exports = mongoose.model("City", citySchema);
