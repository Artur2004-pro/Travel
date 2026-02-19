import { useEffect, useRef, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { useNavigate } from "react-router-dom";
import { Card } from "../components";
import SkeletonGrid from "../components/layout/skeleton-grid";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) return <SkeletonGrid count={6} />;

  return (
    <div className="max-w-feed md:max-w-3xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {trips.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-12">No trips yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {trips.map((trip) => (
            <article key={trip._id}>
              <Card>
                <div className="overflow-hidden rounded-xl shadow-sm bg-white dark:bg-neutral-900">
                  {trip.coverImage ? (
                    <div
                      onClick={() => navigate(`/trips/${trip._id}`)}
                      className="w-full h-48 sm:h-44 md:h-40 bg-neutral-100 dark:bg-neutral-900 cursor-pointer overflow-hidden rounded-t-xl"
                    >
                      <img src={(app.current || "") + trip.coverImage} alt={trip.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-full h-48 sm:h-44 md:h-40 bg-neutral-100 dark:bg-neutral-900 rounded-t-xl" />
                  )}

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{trip.title}</div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {dayjs(trip.startDate).format("MMM D")} – {dayjs(trip.endDate).format("MMM D")} · {trip.dayCount} days
                        </div>
                      </div>
                      <div className="text-neutral-400 flex-shrink-0">
                        {trip.isPrivate ? <Lock size={16} /> : <Unlock size={16} />}
                      </div>
                    </div>

                    {trip.description && (
                      <p className="mt-3 text-sm text-neutral-500 line-clamp-3">{trip.description}</p>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-3 text-neutral-600 dark:text-neutral-400">
                        <button onClick={() => navigate(`/trips/${trip._id}`)} aria-label="View trip" className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => navigate(`/trips/edit/${trip._id}`)} aria-label="Edit trip" className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => toggleComplete(trip._id, trip.isCompleted || false)} aria-label="Toggle complete" className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                          <CheckCircle size={18} />
                        </button>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button onClick={() => togglePrivate(trip._id, trip.isPrivate)} aria-label="Toggle private" className="text-neutral-600 dark:text-neutral-400 p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                          {trip.isPrivate ? <Unlock size={18} /> : <Lock size={18} />}
                        </button>
                        <button onClick={() => deleteTrip(trip._id)} aria-label="Delete trip" className="text-neutral-600 dark:text-neutral-400 p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
