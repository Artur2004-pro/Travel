const deleteImage = require("./utilities/delete-image.js");
const env = require("./utilities/env.js");
const {
  createToken,
  verifyToken,
  verifyRefresh,
  createRefreshToken,
} = require("./utilities/jwt.js");
const listen = require("./utilities/listen.js");
const setupSwagger = require("./utilities/swagger.js");
const handleError = require("./utilities/handle-error.js");
const randomNumbers = require("./utilities/random-numbers.js");
const {
  getCachedDataBy,
  getCachedDataById,
} = require("./utilities/getCachedData.js");
const { redis, redisDisconnect } = require("./db/redis.js");
const stopConnection = require("./db/stop-connections.js");
const hotelAdapter = require("./meta/hotel-adapter.js");
const wikidata = require("./meta/wiki-data.js");
const activityAdapter = require("./meta/activity-adapter.js");
const fetchPOI = require("./meta/data-fetch.js");
const attractionAdapter = require("./meta/night-life-adapter.js");
const updateTrip = require("./trip/trip-update.js");
const dateValidaton = require("./trip/date-vaildation.js");
const getTripDayCount = require("./trip/trip-day-count.js");
const hotelById = require("./meta/hotel-by-id.js");
const activityById = require("./meta/activity-by-id.js");
const nightActivityById = require("./meta/night-activity-by-id.js");
const isEmail = require("./utilities/isEmail.js");

module.exports = {
  deleteImage,
  env,
  createToken,
  verifyToken,
  createRefreshToken,
  verifyRefresh,
  listen,
  setupSwagger,
  handleError,
  randomNumbers,
  redis,
  redisDisconnect,
  stopConnection,
  hotelAdapter,
  wikidata,
  activityAdapter,
  attractionAdapter,
  fetchPOI,
  updateTrip,
  getCachedDataBy,
  getCachedDataById,
  dateValidaton,
  getTripDayCount,
  hotelById,
  activityById,
  nightActivityById,
  isEmail,
};
