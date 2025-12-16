const { Schema, model } = require("mongoose");
const tripSchemaMiddleware = require("./middlewares/trip");

const tripSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Missing user id"],
    },
    days: [
      {
        type: Schema.Types.ObjectId,
        ref: "TripDay",
        required: [true, "Missing TripDay id"],
      },
    ],
    title: { type: String, required: true },
    description: { type: String },

    startDate: { type: Date, required: [true, "Missing start date"] },
    endDate: { type: Date, required: [true, "Missing end date"] },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: [true, "Missing country id"],
    },

    budget: {
      planned: { type: Number, default: 0 },
      spent: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    isPrivate: { type: Boolean, default: false },
    coverImage: { type: String },
  },
  { timestamps: true }
);

tripSchema.plugin(tripSchemaMiddleware);

module.exports = model("Trip", tripSchema);
