const mongoose = require("mongoose");
const countryMiddleware = require("./middlewares/country.js");

const countrySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Country name is required"] },
  description: { type: String },
  images: [{ type: String }],
  top: { type: Number, default: 0 },
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
  lat: Number,
  lon: Number,
});

countrySchema.plugin(countryMiddleware);
module.exports = mongoose.model("Country", countrySchema);
