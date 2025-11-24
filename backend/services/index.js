const userService = require("./user.service.js");
const countryService = require("./country.service.js");
const cityService = require("./city.service.js");
const postService = require("./post.service.js");
const commentService = require("./comment.service.js");
const tripService = require("./trip.service.js");
const tripDayService = require("./trip-day.service.js");
const tripAcitivtyService = require("./trip-acitivty.service.js");

module.exports = {
  userService,
  countryService,
  cityService,
  postService,
  commentService,
  tripService,
  tripDayService,
  tripAcitivtyService,
};
