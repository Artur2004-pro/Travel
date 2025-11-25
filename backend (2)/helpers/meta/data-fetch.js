const axios = require("axios");
const env = require("../utilities/env.js");

async function fetchPOI(options) {
  try {
    const url = env.GEOAPIFY_HOST;
    const params = new URLSearchParams({
      ...options,
      limit: env.DATA_LIMIT,
      apiKey: env.GEOAPIFY_KEY,
    });

    const { data } = await axios.get(`${url}?${params.toString()}`);
    return data;
  } catch (error) {
    return null;
  }
}

module.exports = fetchPOI;
