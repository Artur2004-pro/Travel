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
} from "lucide-react"; // add icons as needed

interface TripDay {
  _id: string;
  order: number;
  date: string;
  cityName: string;
  hotel?: { name: string; address: string /* other */ };
  activities: Array<{
    type: string;
    activity: { name: string; address: string /* other */ };
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
  // other
}

const TripView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id) return;
    Axios.get(`/trip/${id}`)
      .then(({ data }) => setTrip(data.payload))
      .catch(() => toast.error("Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id]);
  const app = useRef(import.meta.env.VITE_APP_DOMAIN);
  if (loading) return <Loader />;
  if (!trip) return <p className="text-center text-red-400">Trip not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#131829] to-[#0b0f19] text-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <button
          onClick={() => navigate("/trips")}
          className="text-zinc-400 hover:text-white mb-4"
        >
          ← Back to My Trips
        </button>
        {trip.coverImage && (
          <img
            src={app.current + trip.coverImage}
            alt="cover"
            className="w-full h-96 object-cover rounded-3xl shadow-lg"
          />
        )}
        <h1 className="text-5xl font-bold">{trip.title}</h1>
        <p className="text-xl text-zinc-300">{trip.description}</p>
        <div className="flex items-center gap-6 text-zinc-400">
          <CalendarIcon /> {trip.startDate} - {trip.endDate}
          {trip.isPrivate && <Lock className="text-red-400" />}
          {trip.isCompleted && <CheckCircle className="text-green-400" />}
        </div>

        <div className="space-y-8">
          {trip.days
            .sort((a, b) => a.order - b.order)
            .map((day) => (
              <div
                key={day._id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6"
              >
                <h2 className="text-3xl font-semibold">
                  Day {day.order} - {day.date}
                </h2>
                <div className="flex items-center gap-2 text-zinc-300">
                  <MapPin /> {day.cityName}
                </div>
                {day.hotel && (
                  <div className="space-y-2">
                    <h3 className="text-2xl flex items-center gap-2">
                      <Hotel /> Hotel: {day.hotel.name}
                    </h3>
                    <p className="text-zinc-400">{day.hotel.address}</p>
                  </div>
                )}
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Activities</h3>
                  {day.activities.map((act, i) => (
                    <div
                      key={i}
                      className="bg-white/3 p-4 rounded-2xl space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        {act.type === "night" ? (
                          <Moon />
                        ) : act.type === "cafe" ? (
                          <Coffee />
                        ) : (
                          <Activity />
                        )}
                        <span className="font-medium">{act.activity.name}</span>
                      </div>
                      <p className="text-zinc-400">{act.activity.address}</p>
                      {act.notes && (
                        <p className="text-sm text-zinc-500">
                          Notes: {act.notes}
                        </p>
                      )}
                      {act.cost && (
                        <p className="text-sm text-zinc-500">
                          Cost: {act.cost}
                        </p>
                      )}
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
