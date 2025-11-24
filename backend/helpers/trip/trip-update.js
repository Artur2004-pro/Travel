const { TripDay } = require("../../models/");

async function updateTrip(trip, dayCount) {
  const { days } = trip;
  const start = new Date(trip.startDate);
  const withoutDays = [];
  for (let i = 0; i < days.length; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + i);

    if (i < dayCount) {
      const tripDay = days[i];
      tripDay.date = dayDate;
      tripDay.order = i + 1;
    } else {
      withoutDays.push(days[i]._id);
    }
  }
  if (dayCount > days.length) {
    for (let i = days.length; i < dayCount; i++) {
      const dayDate = new Date(start);
      dayDate.setDate(start.getDate() + i);

      const tripDay = await TripDay.create({
        trip: trip._id,
        date: dayDate,
        order: i + 1,
      });

      trip.days.push(tripDay);
    }
  }
  const idDays = trip.days.map((day) => day._id);
  await TripDay.deleteMany({ _id: { $in: withoutDays } }).exec();
  await TripDay.updateMany(
    { _id: { $in: idDays } },
    { $set: { trip: trip._id } }
  ).exec();
}

module.exports = updateTrip;
