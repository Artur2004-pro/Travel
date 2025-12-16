const hybridCascadeDelete = require("./hybrid-cascade");
const TripDay = require("../trip-day");

module.exports = hybridCascadeDelete({
  async onQuery(query) {
    const trips = await query.model
      .find(query.getFilter())
      .select("days")
      .lean();

    const dayIds = trips.flatMap((t) => t.days);
    if (dayIds.length) {
      await TripDay.deleteMany({ _id: { $in: dayIds } });
    }
  },

  async onDocument(doc) {
    if (doc.days?.length) {
      await TripDay.deleteMany({ _id: { $in: doc.days } });
    }
  },
});
