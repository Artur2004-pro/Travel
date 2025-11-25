const metaDataApi = require("../../lib/meta-data-api");
const { getCachedDataById } = require("../utilities/getCachedData");

async function activityById(key, id) {
  const activity = await getCachedDataById(key, id);
  if (activity && activity.cache == "empty") {
    const cityName = key.split(":")[1];
    const newData = await metaDataApi.fetchActivity(cityName);
    if (!newData) {
      return null;
    }
    return newData.find((data) => data.id == id);
  }
  return activity;
}

module.exports = activityById;
