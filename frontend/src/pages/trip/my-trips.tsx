// src/pages/MyTrips.tsx
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
  if (!isAuthenticated) {
    navigate("/login");
  }
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const app = useRef(import.meta.env.VITE_APP_DOMAIN);

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
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <main className="max-w-sm mx-auto pt-4 pb-24">
        <h1 className="text-lg font-semibold px-4 mb-4">My Trips</h1>

        {trips.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center">No trips yet</p>
        ) : (
          <div className="space-y-8">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold truncate">
                      {trip.title}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {dayjs(trip.startDate).format("MMM D")} –{" "}
                      {dayjs(trip.endDate).format("MMM D")} · {trip.dayCount}{" "}
                      days
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400">
                    {trip.isPrivate ? <Lock size={16} /> : <Unlock size={16} />}
                    {trip.isCompleted && (
                      <CheckCircle size={16} className="text-emerald-500" />
                    )}
                  </div>
                </div>

                {/* COVER */}
                {trip.coverImage && (
                  <div
                    onClick={() => navigate(`/trips/${trip._id}`)}
                    className="aspect-[4/5] bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
                  >
                    <img
                      src={app.current + trip.coverImage}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* ACTIONS */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex gap-4">
                    <button onClick={() => navigate(`/trips/${trip._id}`)}>
                      <Eye size={20} />
                    </button>
                    <button onClick={() => navigate(`/trips/edit/${trip._id}`)}>
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() =>
                        toggleComplete(trip._id, trip.isCompleted || false)
                      }
                    >
                      <CheckCircle size={20} />
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => togglePrivate(trip._id, trip.isPrivate)}
                    >
                      {trip.isPrivate ? (
                        <Unlock size={20} />
                      ) : (
                        <Lock size={20} />
                      )}
                    </button>
                    <button onClick={() => deleteTrip(trip._id)}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* DESCRIPTION */}
                {trip.description && (
                  <p className="px-4 pb-4 text-sm text-zinc-500 line-clamp-2">
                    {trip.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTrips;
