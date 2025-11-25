const metaDataApi = require("../../lib/meta-data-api");
const { getCachedDataById } = require("../utilities/getCachedData");

async function hotelById(key, id) {
  const hotel = await getCachedDataById(key, id);
  if (!hotel) return null;
  if (hotel.cache == "empty") {
    const cityName = key.split(":")[1];
    const newData = await metaDataApi.fetchHotels(cityName);
    if (!newData) return null;
    const found = newData.find((data) => data.id == id);
    if (!found) return null;
    return found;
  }
  return hotel;
}

module.exports = hotelById;
