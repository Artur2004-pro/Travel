const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Country name is required"] },
  description: { type: String },
  images: [{ type: String }],
  top: {type: Number},
});

module.exports = mongoose.model("Country", countrySchema);
