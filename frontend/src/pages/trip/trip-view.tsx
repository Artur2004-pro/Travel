import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader } from "../components";
import toast from "react-hot-toast";
import {
  CalendarIcon,
  MapPin,
  Hotel,
  Activity,
  Moon,
  Coffee,
  Lock,
  CheckCircle,
  ArrowLeft,
  Download,
} from "lucide-react";
import dayjs from "dayjs";

interface TripDay {
  _id: string;
  order: number;
  date: string;
  cityName: string;
  hotel?: { name: string; address: string };
  activities: Array<{
    type: string;
    activity: { name: string; address: string };
    notes?: string;
    cost?: number;
  }>;
}

interface Trip {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  isCompleted?: boolean;
  coverImage?: string;
  dayCount?: number;
  days: TripDay[];
}

const TripView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const app = useRef(import.meta.env.VITE_APP_DOMAIN || "");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Axios.get(`/trip/${id}`)
      .then(({ data }) => setTrip(data.payload))
      .catch(() => toast.error("Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownloadPdf = async () => {
    if (!id) return;
    setPdfLoading(true);
    try {
      const { data } = await Axios.get(`/trip/${id}/pdf`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `trip-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    } catch {
      toast.error("Failed to download PDF");
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!trip) return null;

  return (
    <div className="max-w-feed mx-auto pb-20 md:pb-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <header className="sticky top-0 z-10 h-14 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2 md:px-4">
            <button
              onClick={() => navigate("/trips")}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={18} strokeWidth={2} /> Trips
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Download size={16} strokeWidth={2} />
              {pdfLoading ? "Generating…" : "Download PDF"}
            </button>
          </header>

          <div className="space-y-6 mt-6">
            {trip.coverImage && (
              <div className="w-full rounded-xl overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-900">
                <img src={app.current + trip.coverImage} alt="" className="w-full h-60 object-cover rounded-xl" />
              </div>
            )}

            <div className="space-y-2">
              <h1 className="text-xl font-semibold">{trip.title}</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{trip.description}</p>
              <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <CalendarIcon size={14} strokeWidth={2} />
                  {dayjs(trip.startDate).format("MMM D")} – {dayjs(trip.endDate).format("MMM D")}
                </span>
                {trip.isPrivate && <Lock size={14} strokeWidth={2} />}
                {trip.isCompleted && (
                  <CheckCircle size={14} className="text-emerald-500" strokeWidth={2} />
                )}
              </div>
            </div>

            <div className="space-y-4">
              {trip.days.sort((a, b) => a.order - b.order).map((day) => (
                <div key={day._id} className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 space-y-3 shadow-sm bg-white dark:bg-neutral-950">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <h2 className="font-medium text-sm">Day {day.order} · {dayjs(day.date).format("MMM D")}</h2>
                    <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400"><MapPin size={12} strokeWidth={2} /> {day.cityName}</span>
                  </div>

                  {day.hotel && (
                    <div className="flex gap-2 text-sm items-start">
                      <Hotel size={16} className="mt-0.5 text-neutral-400 flex-shrink-0" strokeWidth={2} />
                      <div>
                        <p className="font-medium">{day.hotel.name}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{day.hotel.address}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex gap-2 items-start text-sm">
                        {act.type === "night" ? (
                          <Moon size={16} className="mt-0.5 text-neutral-400 flex-shrink-0" strokeWidth={2} />
                        ) : act.type === "cafe" ? (
                          <Coffee size={16} className="mt-0.5 text-neutral-400 flex-shrink-0" strokeWidth={2} />
                        ) : (
                          <Activity size={16} className="mt-0.5 text-neutral-400 flex-shrink-0" strokeWidth={2} />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{act.activity.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{act.activity.address}</p>
                          {act.notes && <p className="text-xs text-neutral-400 mt-1">{act.notes}</p>}
                          {act.cost != null && <p className="text-xs text-neutral-400">Cost: {act.cost}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar on desktop: trip actions and meta */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-xl p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="text-sm font-semibold mb-2">Trip info</div>
              <div className="text-xs text-neutral-500">{trip.dayCount || trip.days.length} days · {dayjs(trip.startDate).format("MMM D")} - {dayjs(trip.endDate).format("MMM D")}</div>
              <div className="mt-3 flex flex-col gap-2">
                <button onClick={() => navigate(`/trips/edit/${trip._id}`)} className="px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm">Edit trip</button>
                <button onClick={() => navigate(`/trips`)} className="px-3 py-2 rounded-lg bg-white dark:bg-black text-sm border border-neutral-200 dark:border-neutral-800">Back to trips</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TripView;
