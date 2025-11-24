const { handleError } = require("../helpers");
const { TripActivity } = require("../models");

async function isTripActivityAuthor(req, res, next) {
  const { id } = req.params;
  const userId = req.user._id;
  if (!id) {
    return res.status(400).send({ message: "Missing id" });
  }
  try {
    const activity = TripActivity.findById(id);
    if (!activity) {
      return res.status(404).send({ message: "Activity not found" });
    }
    if (userId.toString() != activity.user) {
      return res
        .status(409)
        .send({ message: "Cannot access or modify this activity" });
    }
  } catch (error) {
    return handleError(res, err);
  }
}

module.exports = isTripActivityAuthor;
