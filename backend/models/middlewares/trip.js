async function tripSchemaMiddleware(schema) {
  const events = [
    "deleteMany",
    "findOneAndDelete",
    "findOneAndRemove",
    "deleteOne",
    "remove",
    "delete",
    "findByIdAndDelete",
    "findByIdAndRemove",
  ];

  for (const event of events) {
    schema.pre(event, async function (next) {
      try {
        await cascadeDeleteTrip(this);
        next();
      } catch (error) {
        next(error);
      }
    });
  }
}

async function cascadeDeleteTrip(query) {
  const TripDay = require("../trip-day.js");
  const filter = query.getFilter();
  const trips = await query.model.find(filter).select("days").lean();

  if (!trips.length) return;
  const dayIds = trips.flatMap((trip) => trip.days);

  await TripDay.deleteMany({ _id: { $in: dayIds } });
}

module.exports = tripSchemaMiddleware;
