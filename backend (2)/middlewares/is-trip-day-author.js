const { handleError } = require("../helpers");
const { TripDay } = require("../models");

async function isTripDayAuthor(req, res, next) {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const tripDay = await TripDay.findById(id);
    if (!tripDay) {
      return res.status(404).send({ message: "Trip day not found" });
    }
    if (userId.toString() != tripDay.user) {
      return res
        .status(409)
        .send({ message: "Cannot access or modify this trip day" });
    }
    req.tripDay = tripDay;
    return next();
  } catch (error) {
    return handleError(res, err);
  }
}

module.exports = isTripDayAuthor;
