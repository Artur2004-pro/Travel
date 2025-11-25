async function tripDayMiddleware(schema) {
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
        await cascadeDeleteTripDay(this);
        next();
      } catch (error) {
        next(error);
      }
    });
  }
}

async function cascadeDeleteTripDay(query) {
  const TripActivity = require("../trip-activity.js");
  const filter = query.getFilter();
  const tripDays = await query.model.find(filter).select("_id").lean();

  if (!tripDays.length) return;

  const ids = tripDays.map((td) => td._id);
  await TripActivity.deleteMany({ day: { $in: ids } });
}

module.exports = tripDayMiddleware;
