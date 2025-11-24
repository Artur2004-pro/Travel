const { Trip, handleError } = require("../helpers");

async function isTripAuthor(req, res, next) {
  const { id } = req.params;
  const userId = req.user._id;
  if (!id) {
    return res.status(400).send({ message: "Missing id" });
  }
  try {
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).send({ message: "Trip not found" });
    }
    if (userId.toString() != trip.user) {
      return res
        .status(409)
        .send({ message: "Cannot access or modify this trip" });
    }
    req.trip = trip;
    return next();
  } catch (error) {
    return handleError(res, err);
  }
}

module.exports = isTripAuthor;
