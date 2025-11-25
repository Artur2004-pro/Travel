async function nightActivityById(key, id) {
  const metaDataApi = require("../../lib/meta-data-api");
  const { getCachedDataById } = require("../utilities/getCachedData");
  const activity = await getCachedDataById(key, id);
  if (activity && activity.cache == "empty") {
    const cityName = key.split(":")[1];
    const newData = await metaDataApi.fetchNightLife(cityName);
    if (!newData) {
      return null;
    }
    return newData.map((data) => data.id == id);
  }
  return activity;
}

module.exports = nightActivityById;
