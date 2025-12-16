const hybridCascadeDelete = require("./hybrid-cascade");
const City = require("../city");
const { deleteImage } = require("../../helpers");

module.exports = hybridCascadeDelete({
  async onQuery(query) {
    const countries = await query.model
      .find(query.getFilter())
      .select("_id images")
      .lean();

    const countryIds = countries.map((c) => c._id);

    for (const c of countries) {
      if (c.images?.length) await deleteImage(c.images);
    }

    const cities = await City.find({ countryId: { $in: countryIds } })
      .select("images")
      .lean();

    for (const city of cities) {
      if (city.images?.length) await deleteImage(city.images);
    }

    await City.deleteMany({ countryId: { $in: countryIds } });
  },

  async onDocument(doc) {
    if (doc.images?.length) await deleteImage(doc.images);

    const cities = await City.find({ countryId: doc._id })
      .select("images")
      .lean();

    for (const city of cities) {
      if (city.images?.length) await deleteImage(city.images);
    }

    await City.deleteMany({ countryId: doc._id });
  },
});
