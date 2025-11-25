const axios = require("axios");
const { env } = require("../helpers/");
async function geolocation(name) {
  try {
    const { data } = await axios.get(
      `${env.GEOCODING_API_URL}search?name=${name}&count=1`
    );
    if (data.results?.length) {
      const { latitude, longitude } = data.results[0];
      return { latitude, longitude };
    }
    return null;
  } catch (error) {
    return null;
  }
}

module.exports = geolocation;
