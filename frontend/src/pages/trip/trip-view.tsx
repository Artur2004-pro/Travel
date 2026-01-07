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
  days: TripDay[];
}

const TripView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const app = useRef(import.meta.env.VITE_APP_DOMAIN);

  useEffect(() => {
    if (!id) return;
    Axios.get(`/trip/${id}`)
      .then(({ data }) => setTrip(data.payload))
      .catch(() => toast.error("Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!trip) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 px-4 h-12 flex items-center">
        <button
          onClick={() => navigate("/trips")}
          className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          <ArrowLeft size={18} /> Trips
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4 py-4 space-y-6">
        {/* Cover */}
        {trip.coverImage && (
          <img
            src={app.current + trip.coverImage}
            alt="cover"
            className="w-full aspect-square object-cover rounded-xl shadow-sm"
          />
        )}

        {/* Trip Info */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">{trip.title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {trip.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <CalendarIcon size={14} />
              {dayjs(trip.startDate).format("MMM D")} –{" "}
              {dayjs(trip.endDate).format("MMM D")}
            </span>
            {trip.isPrivate && <Lock size={14} />}
            {trip.isCompleted && (
              <CheckCircle size={14} className="text-emerald-500" />
            )}
          </div>
        </div>

        {/* Days */}
        <div className="space-y-4">
          {trip.days
            .sort((a, b) => a.order - b.order)
            .map((day) => (
              <div
                key={day._id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3 shadow-sm"
              >
                {/* Day Header */}
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-sm">
                    Day {day.order} · {dayjs(day.date).format("MMM D")}
                  </h2>
                  <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <MapPin size={12} /> {day.cityName}
                  </span>
                </div>

                {/* Hotel */}
                {day.hotel && (
                  <div className="flex gap-2 text-sm items-start">
                    <Hotel
                      size={16}
                      className="mt-0.5 text-zinc-500 dark:text-zinc-400"
                    />
                    <div>
                      <p className="font-medium">{day.hotel.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {day.hotel.address}
                      </p>
                    </div>
                  </div>
                )}

                {/* Activities */}
                <div className="space-y-2">
                  {day.activities.map((act, i) => (
                    <div key={i} className="flex gap-2 items-start text-sm">
                      {act.type === "night" ? (
                        <Moon size={16} />
                      ) : act.type === "cafe" ? (
                        <Coffee size={16} />
                      ) : (
                        <Activity size={16} />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{act.activity.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {act.activity.address}
                        </p>
                        {act.notes && (
                          <p className="text-xs text-zinc-400 mt-1">
                            {act.notes}
                          </p>
                        )}
                        {act.cost && (
                          <p className="text-xs text-zinc-400">
                            Cost: {act.cost}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TripView;
