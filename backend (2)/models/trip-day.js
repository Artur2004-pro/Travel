const { Schema, model } = require("mongoose");
const tripDayMiddleware = require("./middlewares/trip-day");

const HotelSchema = new Schema({
  id: String,
  name: String,
  address: String,
  lat: Number,
  lon: Number,
  rooms: Number,
  stars: { type: Number, default: 1 },
  phone: { type: [String], default: [] },
  email: { type: String, default: "" },
  website: { type: String, default: "" },
  images: { type: [String], default: [] },
  openingHours: { type: String, default: "" },
});

const TripDaySchema = new Schema(
  {
    trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
    date: { type: Date, required: true },
    hotel: { type: HotelSchema, default: null },
    activities: [{ type: Schema.Types.ObjectId, ref: "TripActivity" }],
    order: Number,
    cityName: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

tripDayMiddleware(TripDaySchema);

module.exports = model("TripDay", TripDaySchema);
