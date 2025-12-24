const QRCode = require("qrcode");

async function generateQr(data) {
  return QRCode.toDataURL(data, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 200,
  });
}
module.exports = generateQr;
