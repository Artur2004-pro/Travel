const { deleteImage } = require("../../helpers");

async function cityMiddleware(schema) {
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
        await cascadeCityImages(this);
        next();
      } catch (err) {
        next(err);
      }
    });
  }
}

async function cascadeCityImages(query) {
  const filter = query.getFilter();

  const cities = await query.model.find(filter).lean();
  if (!cities.length) return;

  for (const city of cities) {
    if (Array.isArray(city.images) && city.images.length) {
      await deleteImage(city.images);
    }
  }
}

module.exports = cityMiddleware;
