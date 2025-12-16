// src/pages/trip/trip.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

interface TripData {
  countryId?: string;
  tripId?: string;
  startDate?: string;
  endDate?: string;
  cityId?: string;
  hotelId?: string | null;
}

interface CompletedSteps {
  country: boolean;
  planning: boolean;
  city: boolean;
  hotel: boolean; // optional է, բայց պահպանենք
  dayPlanning: boolean;
  finish: boolean;
}

const DEFAULT_COMPLETED: CompletedSteps = {
  country: false,
  planning: false,
  city: false,
  hotel: false,
  dayPlanning: false,
  finish: false,
};

export const Trip: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tripData, setTripDataState] = useState<TripData>({});
  const [completed, setCompletedState] =
    useState<CompletedSteps>(DEFAULT_COMPLETED);

  const setTripData = (patch: Partial<TripData>) =>
    setTripDataState((prev) => ({ ...prev, ...patch }));

  const setCompleted = (patch: Partial<CompletedSteps>) =>
    setCompletedState((prev) => ({ ...prev, ...patch }));

  const currentStep = location.pathname.split("/").pop() || "country";

  // === STRICT NAVIGATION CHECK ===
  useEffect(() => {
    // Եթե առաջին step-ն է՝ թույլատրել
    if (currentStep === "country") return;

    // Planning → պետք է country ընտրված լինի
    if (currentStep === "planning" && !completed.country) {
      navigate("/trips/new/country", { replace: true });
      return;
    }

    // Hotel → պետք է city ընտրված լինի
    // if (currentStep === "hotel" && !completed.city) {
    //   navigate("/trips/new/city", { replace: true });
    //   return;
    // }

    // // Day Planning → hotel-ը optional է, բայց city-ն պարտադիր է
    // if (currentStep === "day-planning" && !completed.city) {
    //   navigate("/trips/new/city", { replace: true });
    //   return;
    // }

    // Finish → պետք է day-planning ավարտված լինի
    if (currentStep === "finish" && !completed.dayPlanning) {
      navigate("/trips/new/day-planning", { replace: true });
      return;
    }
  }, [currentStep, completed, navigate]);

  // Title վերևում՝ current step-ի համար
  const getTitle = () => {
    switch (currentStep) {
      case "country":
        return "Choose Your Destination";
      case "planning":
        return "Trip Planning";
      case "city":
        return "Choose a City";
      case "hotel":
        return "Select Hotel (optional)";
      case "day-planning":
        return "Plan Your Trip Days";
      case "finish":
        return "You're Done!";
      default:
        return "Create Your Trip";
    }
  };

  const contextValue = useMemo(
    () => ({
      tripData,
      setTripData,
      completed,
      setCompleted,
    }),
    [tripData, completed]
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Գեղեցիկ title վերևում */}
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-12">
        {getTitle()}
      </h1>

      {/* Content — step component-ները */}
      <Outlet context={contextValue} />
    </div>
  );
};

export default Trip;
