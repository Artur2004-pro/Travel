async function generateTripPdf(trip) {
  const generateQr = require("./qr-code.js");
  const htmlToPdf = require("./puppeteer.js");
  const renderTripTemplate = require("../../templates/trip-template.js");
  const qrCode = await generateQr(`${process.env.APP_URL}/trip/${trip._id}`);

  const html = renderTripTemplate({
    title: trip.title,
    days: trip.days,
    qrCode,
  });

  return await htmlToPdf(html);
}
module.exports = generateTripPdf;
