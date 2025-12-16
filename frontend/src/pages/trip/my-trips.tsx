import React, { useEffect, useRef, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components"; // assume you have Loader
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
import dayjs from "dayjs"; // for date formatting, install if needed: npm i dayjs

interface Trip {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  isPrivate: boolean;
  isCompleted?: boolean; // assume backend supports this
  coverImage?: string;
  dayCount: number;
  // other fields if needed
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
    } catch (err) {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  const deleteTrip = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await Axios.delete(`/trip/${id}`);
      toast.success("Trip deleted");
      fetchTrips();
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  const togglePrivate = async (id: string, current: boolean) => {
    try {
      await Axios.patch(`/trip/${id}`, { isPrivate: !current }); // assume endpoint supports
      toast.success(`Trip is now ${current ? "public" : "private"}`);
      fetchTrips();
    } catch (err) {
      toast.error("Failed to update privacy");
    }
  };

  const toggleComplete = async (id: string, current: boolean) => {
    try {
      await Axios.patch(`/trip/${id}/complete`, { isCompleted: !current }); // assume new endpoint
      toast.success(`Trip marked as ${current ? "incomplete" : "completed"}`);
      fetchTrips();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const cloneTrip = async (id: string) => {
    if (!newStartDate || !newEndDate) {
      toast.error("Please select new dates");
      return;
    }
    if (new Date(newStartDate) > new Date(newEndDate)) {
      toast.error("Start date cannot be after end date");
      return;
    }

    try {
      // First, fetch full old trip
      const { data: oldTripRes } = await Axios.get(`/trip/${id}`);
      const oldTrip = oldTripRes.payload;

      // Create new trip
      const { data: newTripRes } = await Axios.post("/trip", {
        countryId: oldTrip.country,
        title: `Copy of ${oldTrip.title}`,
        description: oldTrip.description,
        startDate: newStartDate,
        endDate: newEndDate,
      });
      const newTripId = newTripRes.payload._id;

      // Copy days
      for (const oldDay of oldTrip.days) {
        const newDayRes = await Axios.post("/trip-day", {
          tripId: newTripId,
          order: oldDay.order,
          cityId: oldDay.city, // assume cityId from cityName or something, adjust if needed
          hotelId: oldDay.hotel?.id || null,
        });
        const newDayId = newDayRes.data.payload._id;

        // Copy activities
        for (const oldAct of oldDay.activities) {
          if (oldAct.type === "night") {
            await Axios.post("/activity/night", {
              tripDayId: newDayId,
              cityId: oldDay.city, // assume
              nightActivityId: oldAct.activity.id,
              notes: oldAct.notes,
              cost: oldAct.cost,
            });
          } else {
            await Axios.post("/activity", {
              tripDayId: newDayId,
              cityId: oldDay.city,
              activityId: oldAct.activity.id,
              notes: oldAct.notes,
              cost: oldAct.cost,
            });
          }
        }
      }

      // Copy cover if exists
      if (oldTrip.coverImage) {
        // Assume need to copy image, but for simplicity, skip or implement if needed
      }

      toast.success("Trip cloned successfully");
      setCloningId(null);
      setNewStartDate("");
      setNewEndDate("");
      fetchTrips();
      navigate(`/trips/${newTripId}`);
    } catch (err) {
      toast.error("Failed to clone trip");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#131829] to-[#0b0f19] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          My Trips
        </h1>

        {trips.length === 0 ? (
          <p className="text-center text-zinc-400 text-xl">
            No trips yet. Create one!
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4 shadow-lg hover:shadow-xl transition"
              >
                {trip.coverImage && (
                  <img
                    src={app.current + trip.coverImage}
                    alt="cover"
                    className="w-full h-40 object-cover rounded-2xl mb-4"
                  />
                )}
                <h2 className="text-2xl font-semibold">{trip.title}</h2>
                <p className="text-zinc-400 line-clamp-2">{trip.description}</p>
                <div className="text-sm text-zinc-500">
                  {dayjs(trip.startDate).format("MMM D, YYYY")} -{" "}
                  {dayjs(trip.endDate).format("MMM D, YYYY")} ({trip.dayCount}{" "}
                  days)
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {trip.isPrivate ? (
                    <Lock size={16} className="text-red-400" />
                  ) : (
                    <Unlock size={16} className="text-green-400" />
                  )}
                  {trip.isCompleted ? (
                    <CheckCircle size={16} className="text-green-400" />
                  ) : null}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/trips/${trip._id}`)}
                    className="p-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 transition"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => navigate(`/trips/edit/${trip._id}`)}
                    className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 transition"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteTrip(trip._id)}
                    className="p-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    onClick={() => setCloningId(trip._id)}
                    className="p-2 rounded-xl bg-green-600/20 hover:bg-green-600/30 transition"
                    title="Clone"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() =>
                      toggleComplete(trip._id, trip.isCompleted || false)
                    }
                    className="p-2 rounded-xl bg-yellow-600/20 hover:bg-yellow-600/30 transition"
                    title={
                      trip.isCompleted ? "Mark Incomplete" : "Mark Completed"
                    }
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    onClick={() => togglePrivate(trip._id, trip.isPrivate)}
                    className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 transition"
                    title={trip.isPrivate ? "Make Public" : "Make Private"}
                  >
                    {trip.isPrivate ? <Unlock size={18} /> : <Lock size={18} />}
                  </button>
                </div>

                {cloningId === trip._id && (
                  <div className="mt-4 space-y-2">
                    <input
                      type="date"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10"
                    />
                    <input
                      type="date"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10"
                    />
                    <button
                      onClick={() => cloneTrip(trip._id)}
                      className="w-full py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      Clone with New Dates
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
