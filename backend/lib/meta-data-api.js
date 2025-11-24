const { City } = require("../models");
const {
  env,
  redis,
  hotelAdapter,
  wikidata,
  activityAdapter,
  fetchPOI,
  attractionAdapter,
} = require("../helpers");

class MetaDataApi {
  async fetchHotels(name) {
    if (!name) return null;
    try {
      const city = await City.findOne({ name: name });
      if (!city) return null;

      const { lat } = city;
      const { lon } = city;

      const options = {
        categories: "accommodation.hotel",
        filter: `circle:${lon},${lat},20000`,
      };
      const data = await fetchPOI(options);

      if (!data) {
        return null;
      }
      const hotels = hotelAdapter(data.features);

      const images = await wikidata(hotels.map((hotel) => hotel.wikidata));
      hotels.forEach((hotel, i) => {
        hotel.images = images[i];
      });

      await redis.setex(
        `hotel:${name}`,
        env.CACHE_TTL_HOURS,
        JSON.stringify(hotels)
      );
      return hotels;
    } catch (error) {
      return null;
    }
  }
  async fetchActivity(name) {
    if (!name) {
      return null;
    }
    const city = await City.findOne({ name: name });
    if (!city) {
      return null;
    }
    const { lat } = city;
    const { lon } = city;

    const options = {
      categories: "catering.restaurant,catering.cafe,tourism.sights",
      filter: `circle:${lon},${lat},3000`,
    };
    const data = await fetchPOI(options);
    if (!data) {
      return null;
    }

    const activities = activityAdapter(data.features);
    const images = await wikidata(activities.map((item) => item.wikidata));
    activities.forEach((item, i) => {
      item.images = images[i];
    });
    await redis.setex(
      `activity:${name}`,
      env.CACHE_TTL_HOURS,
      JSON.stringify(activities)
    );
    return activities;
  }
  async fetchNightLife(name) {
    const city = await City.findOne({ name: name });
    if (!city) {
      return null;
    }
    const { lat } = city;
    const { lon } = city;
    const options = {
      categories: "adult.nightclub,catering.bar,catering.pub",
      filter: `circle:${lon},${lat},1000`,
    };
    const data = await fetchPOI(options);
    const attractions = attractionAdapter(data.features);
    await redis.setex(
      `night-life:${name}`,
      env.CACHE_TTL_HOURS,
      JSON.stringify(attractions)
    );
    return attractions;
  }
}

module.exports = new MetaDataApi();
