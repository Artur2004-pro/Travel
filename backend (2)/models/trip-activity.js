const { Schema, model } = require("mongoose");

const activityPlacesSchema = new Schema({
  id: String,
  name: String,
  address: String,
  lat: Number,
  lon: Number,
  smoking: { type: Boolean, default: false },
  cuisine: { type: [String], default: [] },
  images: { type: [String], default: [] },
  phone: { type: [String], default: [] },
  email: { type: String, default: "" },
  website: { type: String, default: "" },
  openingHours: { type: String, default: "" },
});

const tripActivitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    day: { type: Schema.Types.ObjectId, ref: "TripDay", required: true },
    type: {
      type: String,
      enum: ["attraction", "restaurant", "cafe", "pub", "other"],
      required: true,
    },
    notes: { type: String },
    cost: { type: Number, default: 0 },
    activity: activityPlacesSchema,
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

module.exports = model("TripActivity", tripActivitySchema);
