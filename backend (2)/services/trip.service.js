const {
  deleteImage,
  dateValidaton,
  getTripDayCount,
  updateTrip,
} = require("../helpers/index.js");
const { Trip, Country } = require("../models");
const { ServiceError, ErrorHandler } = require("./error-handler.js");

class TripService {
  async getTrip(data) {
    try {
      const { id, userId } = data;
      const trip = await Trip.findById(id).populate({
        path: "days",
        populate: { path: "activities" },
      });
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (trip.user != userId && trip.isPrivate) {
        throw new ServiceError("Trip is private", 400);
      }
      return trip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async addCoverImage(data) {
    try {
      const { id, image, userId } = data;
      const trip = await Trip.findById(id);
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (trip.user != userId) {
        throw new ServiceError("Cannot access or modify this trip", 409);
      }
      await deleteImage(trip.coverImage || []);
      trip.coverImage = image;
      await trip.save();
      return trip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async removeCoverImage(data) {
    try {
      const { id, role, userId } = data;
      const trip = await Trip.findById(id);
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (trip.user != userId || role != "admin") {
        throw new ServiceError("Cannot access or modify this trip", 409);
      }
      await deleteImage(trip.coverImage || []);
      trip.coverImage = "";
      await trip.save();
      return trip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getMyTrips(data) {
    try {
      const { id } = data;
      const trips = await Trip.find({ user: id }).populate("days");
      if (!trips || !trips.length) {
        throw new ServiceError("Trip not found", 404);
      }
      return trips;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async update(data) {
    try {
      const { id, startDate, endDate, title, description, userId } = data;
      const trip = await Trip.findById(id).populate("days");
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (trip.user != userId) {
        throw new ServiceError("Cannot access or modify this trip");
      }
      const isValid = dateValidaton(
        startDate || trip.startDate,
        endDate || trip.endDate
      );
      if (isValid.message != "ok") {
        throw new ServiceError(isValid.message, 409);
      }
      if (startDate) trip.startDate = startDate;
      if (endDate) trip.endDate = endDate;
      if (title) trip.title = title;
      if (description) trip.description = description;
      const newDayCount = getTripDayCount(trip.startDate, trip.endDate);
      const updatedTrip = await updateTrip(trip, newDayCount);
      await updatedTrip.save();
      return updatedTrip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async togglePrivate(data) {
    try {
      const { id, userId } = data;
      const trip = await Trip.findById(id);
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (userId != trip.user) {
        throw new ServiceError("Cannot access or modify this trip", 409);
      }
      trip.isPrivate = !trip.isPrivate;
      await trip.save();
      return trip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getAllTrips(data) {
    try {
      const { role, id, userId } = data;
      const trips = await Trip.find({ user: id });
      if (!trips || !trips.length) {
        throw new ServiceError("Not trips found", 404);
      }
      const filtered =
        id != userId && role != "admin"
          ? trips.filter((trip) => !trip.isPrivate)
          : trips;

      return filtered;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async add(data) {
    try {
      const { startDate, endDate, countryId, userId } = data;
      const isValid = dateValidaton(startDate, endDate);
      if (isValid.message != "ok") {
        throw new ServiceError(isValid.message, 409);
      }
      const countryExists = await Country.findById(countryId);
      if (!countryExists) {
        throw new ServiceError("Country not found", 404);
      }
      const trip = await Trip.create({
        country: countryExists._id,
        user: userId,
        startDate,
        endDate,
        title,
        description,
        days: [],
      });
      return trip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async delete(data) {
    try {
      const { id, userId } = data;
      const trip = await Trip.findById(id);
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (userId != trip.user) {
        throw new ServiceError("Cannot access or modify this trip", 409);
      }
      await trip.deleteOne();
      await deleteImage(trip.coverImage || []);
      return trip;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new TripService();
