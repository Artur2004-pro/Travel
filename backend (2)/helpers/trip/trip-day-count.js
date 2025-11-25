function getTripDayCount(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff = end - start;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

  return days;
}

module.exports = getTripDayCount;
