function validationDate(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const today = new Date();
  const todayUTC = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const startUTC = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );
  const endUTC = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  if (startUTC < todayUTC) {
    return { message: "Start date cannot be in the past" };
  }
  if (endUTC < startUTC) {
    return { message: "End date must be after start date" };
  }
  return { message: "ok" };
}

module.exports = validationDate;