const { activityById, nightActivityById } = require("../helpers/index.js");
const { TripActivity, Trip, TripDay, City } = require("../models");
const { ServiceError, ErrorHandler } = require("./error-handler.js");

class TripActivityService {
  async activitiesByTripDayId(data) {
    try {
      const { id, userId, role } = data;
      const activities = await TripActivity.find({ tripDay: id });
      if (!activities || !activities.length) {
        throw new ServiceError("Activities not found", 404);
      }
      const tripId = activities[0].trip;
      const trip = await Trip.findById(tripId);
      if (userId != trip.user && role != "admin" && trip.isPrivate) {
        throw new ServiceError("Cannot access this trip activity", 409);
      }
      return activities;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async activityById(data) {
    try {
      const { id, userId, role } = data;
      const activity = await TripActivity.findById(id);
      if (!activity) {
        throw new ServiceError("Activities not found", 404);
      }
      if (userId == activity.user || role == "admin") {
        return activity;
      }
      const tripId = activity.trip;
      const trip = await Trip.findById(tripId);
      if (trip.isPrivate) {
        throw new ServiceError("Cannot access trip is private", 409);
      }
      return activity;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async addActivity(data) {
    try {
      const { tripDayId, cityId, activityId, notes, cost, userId } = data;
      const tripDay = await TripDay.findById(tripDayId);
      if (!tripDay) {
        throw new ServiceError("Trip day not found", 404);
      }
      if (userId != tripDay.user) {
        throw new ServiceError(
          "Cannot access or modify this trip activity",
          409
        );
      }
      const city = await City.findById(cityId);
      if (!city) {
        throw new ServiceError("Invalid city id", 400);
      }
      const key = `activity:${city.name}`;
      const activity = await activityById(key, activityId);
      if (!activity) {
        throw new ServiceError("Activity not found", 404);
      }
      const newTripActivity = await TripActivity.create({
        user: userId,
        trip: tripDay.trip,
        day: tripDay._id,
        type: activity.type || "other",
        activity,
        notes: notes || "",
        cost: cost || 0,
      });
      await TripDay.findByIdAndUpdate(tripDay._id, {
        $push: { activities: newTripActivity._id },
      });
      return newTripActivity;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async deleteActivity(data) {
    try {
      const { id, userId } = data;
      const activity = await TripActivity.findById(id);
      if (!activity) {
        throw new ServiceError("Activity not found", 404);
      }
      if (userId != activity.user) {
        throw new ServiceError(
          "Cannot access or modify this trip activity",
          409
        );
      }
      await TripDay.findByIdAndUpdate(activity.day, {
        $pull: { activities: activity._id },
      });
      await activity.deleteOne();
      return activity;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async updateActivity(data) {
    try {
      const { notes, cost, userId, id } = data;
      const activity = await TripActivity.findById(id);
      if (!activity) {
        return res.status(404).send({ message: "Activity not found" });
      }
      if (activity.user != userId) {
        throw new ServiceError("Cannot access or modify this trip activity");
      }
      activity.notes = notes || activity.notes;
      activity.cost = cost || activity.cost;
      await activity.save();
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async addNightActivity(data) {
    try {
      const { tripDayId, nightActivityId, cityId, notes, cost, userId } = data;
      const tripDay = await TripDay.findById(tripDayId);
      if (!tripDay) {
        throw new ServiceError("Trip day not found", 404);
      }
      if (userId != tripDay.user) {
        throw new ServiceError("Cannot access or modify this trip", 409);
      }
      const city = await City.findById(cityId);
      if (!city) {
        throw new ServiceError("Invalid city id", 404);
      }
      const key = `night-life:${city.name}`;
      const activity = await nightActivityById(key, nightActivityId);
      const newTripActivity = await TripActivity.create({
        user: userId,
        trip: tripDay.trip,
        day: tripDay._id,
        type: activity.type || "other",
        activity: activity,
        notes: notes || "",
        cost: cost || 0,
      });
      await TripDay.findByIdAndUpdate(tripDay._id, {
        $push: { activities: newTripActivity._id },
      });
      return newTripActivity;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new TripActivityService();
