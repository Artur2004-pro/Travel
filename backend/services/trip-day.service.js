const { hotelById } = require("../helpers/index.js");
const { TripDay, Trip, City } = require("../models");
const { env } = require("../helpers/");
const { ServiceError, ErrorHandler } = require("./error-handler.js");

class TripDayService {
  async tripDayById(data) {
    try {
      const { id, userId } = data;
      const tripDay = await TripDay.findById(id).populate("activities");
      if (!tripDay) {
        throw new ServiceError("Trip day not found", 404);
      }
      if (userId != tripDay.user) {
        const trip = await Trip.findById(tripDay.trip);
        if (trip.isPrivate) {
          throw new ServiceError("This trip is private", 409);
        }
        return tripDay;
      }
      return tripDay;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async tripDaysByTripId(data) {
    try {
      const { tripId, userId } = data;
      const tripDays = await TripDay.find({ trip: tripId })
        .populate("activities")
        .limit(env.DATA_LIMIT || 100);
      if (!tripDays || !tripDays.length) {
        throw new ServiceError("Trip days not found");
      }
      if (userId != tripDays[0].user) {
        const trip = await Trip.findById(tripId);
        if (trip.isPrivate) {
          throw new ServiceError("This trip is private");
        }
        return tripDays;
      }
      return tripDays;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async deleteTripDay(data) {
    try {
      const { userId, id } = data;
      const tripDay = await TripDay.findById(id);
      if (!tripDay) {
        throw new ServiceError("Trip day not found", 404);
      }
      if (tripDay.user != userId) {
        throw new ServiceError("Cannot access or modify this trip day", 409);
      }
      await tripDay.deleteOne();
      return tripDay;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async updateTripDay(data) {
    try {
      const { id, hotelId, cityId, userId } = data;
      const tripDay = await TripDay.findById(id);
      if (!tripDay) {
        throw new ServiceError("Trip day not found", 404);
      }
      if (tripDay.user != userId) {
        throw new ServiceError("Cannot access or modify this trip dat", 409);
      }
      const city = await City.findById(cityId);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      const key = `hotel:${city.name}`;
      const hotel = hotelId ? await hotelById(key, hotelId) : {};
      if (!hotel) {
        throw new ServiceError("Hotel not found", 404);
      }
      tripDay.hotel = hotel.id ? hotel : null;
      tripDay.cityName = city.name;
      await tripDay.save();
      return tripDay;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async createTripDay(data) {
    try {
      const { tripId, order, cityId, hotelId, userId } = data;
      const trip = await Trip.findById(tripId);
      if (!trip) {
        throw new ServiceError("Trip not found", 404);
      }
      if (userId != trip.user) {
        throw new ServiceError("Cannot access or modify this trip", 409);
      }
      const exitst = await TripDay.findOne({ trip: tripId, order: order });
      if (exitst) {
        throw new ServiceError("This order already exists", 400);
      }
      const city = await City.findById(cityId);
      if (!city) {
        throw new ServiceError("City not found", 404);
      }
      const key = `city:${city.name}`;
      const hotel = hotelId ? await hotelById(key, hotelId) : {};
      if (!hotel) {
        throw new ServiceError("Hotel not found", 404);
      }
      const date = new Date(trip.startDate);
      date.setDate(date.getDate() + order);
      const tripDay = await TripDay.create({
        trip: tripId,
        user: userId,
        hotel: hotel.id ? hotel : null,
        cityName: city.name,
        order: order,
        date,
      });
      await Trip.findByIdAndUpdate(tripId, {
        $push: { days: tripDay._id },
      });
      return tripDay;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new TripDayService();
