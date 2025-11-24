const AuthValidator = require("./auth.js");
const AccountValidator = require("./account.js");
const AdminValidator = require("./admin.js");
const CountryValidator = require("./country.js");
const CityValidator = require("./city.js");
const PostValidator = require("./post.js");
const CommentValidator = require("./comment.js");
const MetaDataValidator = require("./metadata.js");
const TripValidator = require("./trip.js");
const TripDayValidator = require("./trip-day.js");
const TripActivityValidator = require("./trip-activity.js");

module.exports = {
  AuthValidator,
  AccountValidator,
  AdminValidator,
  CountryValidator,
  CityValidator,
  PostValidator,
  CommentValidator,
  MetaDataValidator,
  TripValidator,
  TripDayValidator,
  TripActivityValidator,
};
