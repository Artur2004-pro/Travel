const account = require("./account.js");
const admin = require("./admin.js");
const auth = require("./auth.js");
const city = require("./city.js");
const comment = require("./comment.js");
const country = require("./country.js");
const post = require("./post.js");
const metadata = require("./metadata.js");
const trip = require("./trip.js");
const tripDay = require("./trip-day.js");
const tripActivity = require("./trip-activity.js");
// Routers
module.exports = {
  account,
  admin,
  auth,
  city,
  comment,
  country,
  post,
  metadata,
  trip,
  tripDay,
  tripActivity,
};
