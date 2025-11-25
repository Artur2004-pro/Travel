class TripActivityValidator {
  static activitiesByTripDayId(req, res, next) {
    const { id } = req.params;
    const { _id: userId, role } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { id, userId: userId.toString(), role };
    next();
  }
  static activityById(req, res, next) {
    const { id } = req.params;
    const { role, _id: userId } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing trip id" });
    }
    req.body = { role, userId: userId.toString() };
    next();
  }
  static addActivity(req, res, next) {
    const { tripDayId, cityId, activityId, notes, cost } = req.body;
    const userId = req.user._id.toString();
    if (!tripDayId || !cityId || !activityId) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    req.body.userId = userId;
    next();
  }
  static deleteActivity(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing activiy id" });
    }
    req.body = { id, userId };
    next();
  }
  static updateActivity(req, res, next) {
    const { id } = req.params;
    const { notes, cost } = req.body;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing activityId" });
    }
    if (!notes && !cost) {
      return res.status(400).send({
        message: "At least one of notes or cost must be provided",
      });
    }
    req.body = { id, notes, cost, userId };
    next();
  }
  static addNightActivity(req, res, next) {
    const { tripDayId, nightActivityId, cityId, notes, cost } = req.body;
    const userId = req.user._id.toString();
    if (!tripDayId || !nightActivityId || !cityId) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    req.body.userId = userId;
    next();
  }
}

module.exports = TripActivityValidator;
