class TripDayValidator {
  static tripDayById(req, res, next) {
    const { id } = req.params;
    const { _id: userId } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { id, userId: userId.toString() };
    next();
  }
  static tripDaysByTripId(req, res, next) {
    const { tripId } = req.params;
    const userId = req.user._id.toString();
    if (!tripId) {
      return res.status(400).send({ message: "Missing trip id" });
    }
    req.body = { userId, tripId };
    next();
  }
  static deleteTripDay(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing trip day id" });
    }
    req.body = { id, userId };
    next();
  }
  static updateTripDay(req, res, next) {
    const { id } = req.params;
    const { hotelId, cityId } = req.body;
    const userId = req.user._id.toString();
    if (!id || !cityId) {
      return res.status(400).send({ message: "Missing fields" });
    }
    req.body = { hotelId, cityId, id, userId };
    next();
  }
  static createTripDay(req, res, next) {
    const { tripId, order, cityId, hotelId } = req.body;
    const userId = req.user._id.toString();
    if (!tripId || !order || !cityId) {
      return res.status(400).send({ message: "Missing fields" });
    }
    req.body = { tripId, order, cityId, hotelId, userId };
    next();
  }
}

module.exports = TripDayValidator;