// src/pages/City.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { MapPin } from "lucide-react";

export const City: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setTripData } = useOutletContext<any>();

  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripData.countryId) {
      navigate("/trips/country");
      return;
    }

    Axios.get(`/city/all/${tripData.countryId}`)
      .then((res) => setCities(res.data.payload || []))
      .finally(() => setLoading(false));
  }, []);

  const selectCity = (id: string) => {
    setTripData({ cityId: id });
    navigate("/trips/hotel");
  };

  if (loading)
    return (
      <div className="text-center py-32 text-2xl text-zinc-400">Loading...</div>
    );

  return (
    <div className="min-h-screen py-20 px-6">
      <h1
        className="
          text-5xl font-bold text-center mb-16
          bg-gradient-to-r from-indigo-400 to-purple-500
          bg-clip-text text-transparent
        "
      >
        Choose a City
      </h1>

      <div
        className="
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10
          max-w-6xl mx-auto
        "
      >
        {cities.map((city) => (
          <div
            key={city._id}
            onClick={() => selectCity(city._id)}
            className="
              group cursor-pointer rounded-3xl overflow-hidden
              bg-white/[0.04] border border-white/10
              backdrop-blur-2xl shadow-xl shadow-black/30
              p-10 text-center
              hover:bg-white/[0.08] hover:border-indigo-500
              hover:shadow-2xl hover:scale-[1.03]
              transition-all duration-300
            "
          >
            <MapPin
              className="
                w-16 h-16 mx-auto mb-6
                text-indigo-400 group-hover:text-indigo-300
                transition
              "
            />
            <h3 className="text-3xl font-bold text-white mb-3">{city.name}</h3>
            <p className="text-zinc-400">
              {city.description || "Beautiful city to explore"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default City;
