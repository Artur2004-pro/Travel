import React, { useEffect, useRef, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components";
import { Edit, Trash2, CheckCircle, Eye, Lock, Unlock } from "lucide-react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useAuth } from "../../context/auth-context";

interface Trip {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  isCompleted?: boolean;
  coverImage?: string;
  dayCount: number;
}

const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const app = useRef(import.meta.env.VITE_APP_DOMAIN);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get("/trip");
      setTrips(data.payload || []);
    } catch {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await Axios.delete(`/trip/${id}`);
      toast.success("Trip deleted");
      fetchTrips();
    } catch {
      toast.error("Failed to delete trip");
    }
  };

  const togglePrivate = async (id: string, current: boolean) => {
    try {
      await Axios.patch(`/trip/${id}`, { isPrivate: !current });
      fetchTrips();
    } catch {
      toast.error("Failed to update privacy");
    }
  };

  const toggleComplete = async (id: string, current: boolean) => {
    try {
      await Axios.patch(`/trip/${id}/complete`, { isCompleted: !current });
      fetchTrips();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-feed mx-auto px-4 py-6 pb-24 md:pb-8">
      {trips.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-12">No trips yet</p>
      ) : (
        <div className="space-y-6">
          {trips.map((trip) => (
            <article
              key={trip._id}
              className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  <div className="text-sm font-semibold truncate">{trip.title}</div>
                  <div className="text-xs text-neutral-500">
                    {dayjs(trip.startDate).format("MMM D")} –{" "}
                    {dayjs(trip.endDate).format("MMM D")} · {trip.dayCount} days
                  </div>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  {trip.isPrivate ? <Lock size={16} /> : <Unlock size={16} />}
                  {trip.isCompleted && (
                    <CheckCircle size={16} className="text-emerald-500" />
                  )}
                </div>
              </div>

              {trip.coverImage && (
                <div
                  onClick={() => navigate(`/trips/${trip._id}`)}
                  className="aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={app.current + trip.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/trips/${trip._id}`)}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    <Eye size={20} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => navigate(`/trips/edit/${trip._id}`)}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    <Edit size={20} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() =>
                      toggleComplete(trip._id, trip.isCompleted || false)
                    }
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    <CheckCircle size={20} strokeWidth={2} />
                  </button>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => togglePrivate(trip._id, trip.isPrivate)}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    {trip.isPrivate ? (
                      <Unlock size={20} strokeWidth={2} />
                    ) : (
                      <Lock size={20} strokeWidth={2} />
                    )}
                  </button>
                  <button
                    onClick={() => deleteTrip(trip._id)}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>

              {trip.description && (
                <p className="px-4 pb-4 text-sm text-neutral-500 line-clamp-2">
                  {trip.description}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
