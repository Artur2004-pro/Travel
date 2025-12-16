const hybridCascadeDelete = require("./hybrid-cascade");
const TripActivity = require("../trip-activity");

module.exports = hybridCascadeDelete({
  async onQuery(query) {
    const tripDays = await query.model
      .find(query.getFilter())
      .select("_id")
      .lean();

    const ids = tripDays.map((td) => td._id);
    if (!ids.length) return;

    await TripActivity.deleteMany({ day: { $in: ids } });
  },

  async onDocument(doc) {
    if (!doc._id) return;
    await TripActivity.deleteMany({ day: doc._id });
  },
});
