import React, { useEffect, useRef, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components";
import {
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Eye,
  Lock,
  Unlock,
} from "lucide-react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

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
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [cloningId, setCloningId] = useState<string | null>(null);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
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
    <div className="min-h-screen bg-white dark:bg-black px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold mb-6">My Trips</h1>

        {trips.length === 0 ? (
          <p className="text-sm text-zinc-500 text-center">No trips yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-black"
              >
                {/* Cover */}
                {trip.coverImage && (
                  <img
                    src={app.current + trip.coverImage}
                    alt="cover"
                    className="w-full h-40 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h2 className="font-medium truncate">{trip.title}</h2>

                  <p className="text-xs text-zinc-500 line-clamp-2">
                    {trip.description}
                  </p>

                  <p className="text-xs text-zinc-400">
                    {dayjs(trip.startDate).format("MMM D")} –{" "}
                    {dayjs(trip.endDate).format("MMM D")} · {trip.dayCount} days
                  </p>

                  {/* Status */}
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    {trip.isPrivate ? <Lock size={14} /> : <Unlock size={14} />}
                    {trip.isCompleted && (
                      <CheckCircle size={14} className="text-emerald-500" />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-3">
                      <button onClick={() => navigate(`/trips/${trip._id}`)}>
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/trips/edit/${trip._id}`)}
                      >
                        <Edit size={18} />
                      </button>
                      <button onClick={() => setCloningId(trip._id)}>
                        <Copy size={18} />
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          toggleComplete(trip._id, trip.isCompleted || false)
                        }
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() => togglePrivate(trip._id, trip.isPrivate)}
                      >
                        {trip.isPrivate ? (
                          <Unlock size={18} />
                        ) : (
                          <Lock size={18} />
                        )}
                      </button>
                      <button onClick={() => deleteTrip(trip._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Clone */}
                  {cloningId === trip._id && (
                    <div className="pt-3 space-y-2">
                      <input
                        type="date"
                        value={newStartDate}
                        onChange={(e) => setNewStartDate(e.target.value)}
                        className="w-full h-9 px-2 border rounded-md text-sm"
                      />
                      <input
                        type="date"
                        value={newEndDate}
                        onChange={(e) => setNewEndDate(e.target.value)}
                        className="w-full h-9 px-2 border rounded-md text-sm"
                      />
                      <button className="w-full h-9 bg-sky-500 text-white rounded-md text-sm">
                        Clone
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
