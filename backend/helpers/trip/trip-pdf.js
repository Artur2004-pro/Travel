const PDFDocument = require("pdfkit");

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function generateTripPdf(trip) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(24).font("Helvetica-Bold").text(trip.title || "Trip", { continued: false });
    if (trip.startDate && trip.endDate) {
      doc.fontSize(11).font("Helvetica").fillColor("#6b7280").text(
        `${formatDate(trip.startDate)} – ${formatDate(trip.endDate)}`,
        { continued: false }
      );
    }
    doc.moveDown(1.5);

    const days = (trip.days || []).sort((a, b) => (a.order || 0) - (b.order || 0));

    for (const day of days) {
      doc.fontSize(14).font("Helvetica-Bold").fillColor("#1f2937").text(
        `Day ${day.order || "?"} · ${day.cityName || ""} · ${formatDate(day.date)}`,
        { continued: false }
      );
      doc.moveDown(0.5);

      if (day.hotel && (day.hotel.name || day.hotel.address)) {
        doc.fontSize(11).font("Helvetica").text("Hotel: " + [day.hotel.name, day.hotel.address].filter(Boolean).join(" – "), { continued: false });
        doc.moveDown(0.3);
      }

      const activities = day.activities || [];
      if (activities.length > 0) {
        doc.fontSize(11).text("Activities:", { continued: false });
        for (const act of activities) {
          const name = act.activity?.name || act.name || "Activity";
          const addr = act.activity?.address || act.address || "";
          doc.font("Helvetica").text(`  • ${name}${addr ? ` – ${addr}` : ""}`, { continued: false });
        }
        doc.moveDown(0.5);
      }
      doc.moveDown(1);
    }

    doc.end();
  });
}

module.exports = generateTripPdf;
