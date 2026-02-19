import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MapPin } from "lucide-react";
import { ImageCarousel } from "../../components";
import { Axios } from "../../../lib/axios-config";
import TripStepLayout from "../TripStepLayout";

export const City: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setTripData } = useOutletContext<any>();

  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tripData?.countryId) {
      navigate("/trips/country");
      return;
    }

    let mounted = true;
    Axios.get(`/city/all/${tripData.countryId}`)
      .then((res) => {
        if (!mounted) return;
        setCities(res.data.payload || []);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [tripData?.countryId]);

  const selectCity = (id: string) => {
    setTripData({ cityId: id });
    navigate("/trips/hotel");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-zinc-400 animate-pulse">Loading…</div>
    );
  }

  return (
    <TripStepLayout
      title="Choose a city"
      subtitle="Select a city to continue planning"
      stepIndex={3}
      totalSteps={6}
      onBack={() => navigate(-1)}
      onNext={() => {}}
    >
      <div className="max-w-5xl mx-auto px-0 py-4 space-y-6">
        {cities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <MapPin className="w-20 h-20 text-zinc-600" />
            <p className="text-zinc-400 text-lg text-center">No cities found</p>
          </div>
        )}

        <div className="space-y-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
          {cities.map((city) => (
            <button
              key={city._id}
              onClick={() => selectCity(city._id)}
              className="relative w-full text-left overflow-hidden rounded-3xl bg-white/5 dark:bg-zinc-800/30 border border-white/10 dark:border-zinc-700 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
            >
              {city.images?.length > 0 && (
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <ImageCarousel images={city.images} />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-3xl" />

              <div className="relative flex items-center gap-4 p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 dark:bg-white/20 text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-white dark:text-zinc-100 font-semibold truncate">{city.name}</div>
                  <div className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2">{city.description || "Beautiful city to explore"}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </TripStepLayout>
  );
};

export default City;
