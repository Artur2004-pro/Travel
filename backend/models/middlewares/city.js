const hybridCascadeDelete = require("./hybrid-cascade");
const { deleteImage } = require("../../helpers");

module.exports = hybridCascadeDelete({
  async onQuery(query) {
    const cities = await query.model
      .find(query.getFilter())
      .select("images")
      .lean();

    for (const city of cities) {
      if (Array.isArray(city.images) && city.images.length) {
        await deleteImage(city.images);
      }
    }
  },

  async onDocument(doc) {
    if (Array.isArray(doc.images) && doc.images.length) {
      await deleteImage(doc.images);
    }
  },
});
