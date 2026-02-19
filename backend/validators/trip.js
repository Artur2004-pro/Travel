class TripValidator {
  static getTrip(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { userId, id };
    next();
  }
  static addCoverImage(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    if (!req.file) {
      return res.status(400).send({ message: "Missing file" });
    }
    const image = req.file.path;
    req.body = { id, userId, image };
    next();
  }
  static removeCoverImage(req, res, next) {
    const { id } = req.params;
    const { role, _id: userId } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing trip id" });
    }
    req.body = { id, role, userId };
    next();
  }
  static update(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    const { startDate, endDate, title, description } = req.body;
    if (!startDate && !endDate && !title && !description) {
      return res.status(400).send({ message: "Nothing to update" });
    }
    const userId = req.user._id.toString();
    req.body = { id, startDate, endDate, title, description, userId };
    next();
  }
  static togglePrivate(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    const userId = req.user._id.toString();
    req.body = { userId, id };
    next();
  }
  static toggleComplete(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    const userId = req.user._id.toString();
    req.body = { userId, id };
    next();
  }
  static getAllTrips(req, res, next) {
    const { id } = req.params;
    const { role, _id: userId } = req.user;
    if (!id) {
      return res.status(400).send({ message: "Missing user id" });
    }
    req.body = { id, role, userId: userId.toString() };
    next();
  }
  static add(req, res, next) {
    const { startDate, endDate, title, description, countryId } = req.body;
    const userId = req.user._id;
    if (!startDate || !endDate || !title || !countryId) {
      return res.status(400).send({ message: "Missing fields" });
    }
    req.body.userId = userId;
    next();
  }
  static delete(req, res, next) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    req.body = { id, userId };
    next();
  }
}

module.exports = TripValidator;
