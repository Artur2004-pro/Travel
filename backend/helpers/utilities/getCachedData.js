const { redis } = require("../db/redis.js");

async function getCachedDataBy(key, callback) {
  const cachedData = await redis.get(key);
  if (!cachedData) {
    return { cache: "empty" };
  }
  const parsed = JSON.parse(cachedData);
  if (!callback) return parsed;

  const filtered = parsed.filter(callback);
  return filtered;
}

async function getCachedDataById(key, id) {
  const cachedData = await redis.get(key);
  if (!cachedData) {
    return { cache: "empty" };
  }
  const parsed = JSON.parse(cachedData);
  const found = parsed.find((data) => data.id == id);
  return found ? found : null;
}
module.exports = { getCachedDataBy, getCachedDataById };
