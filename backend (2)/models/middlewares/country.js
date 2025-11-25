const City = require("../city.js");
const { deleteImage } = require("../../helpers/index.js");

async function countryMiddleware(schema) {
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
        await cascadeCountryDelete(this);
        next();
      } catch (err) {
        next(err);
      }
    });
  }
}

async function cascadeCountryDelete(query) {
  const filter = query.getFilter();

  const countries = await query.model.find(filter).lean();
  if (!countries.length) return;

  const countryIds = countries.map((c) => c._id);

  for (const country of countries) {
    if (Array.isArray(country.images) && country.images.length) {
      await deleteImage(country.images);
    }
  }

  const cities = await City.find({ countryId: { $in: countryIds } }).lean();

  if (cities.length) {
    for (const city of cities) {
      if (Array.isArray(city.images) && city.images.length) {
        await deleteImage(city.images);
      }
    }
    await City.deleteMany({ countryId: { $in: countryIds } });
  }
}

module.exports = countryMiddleware;
