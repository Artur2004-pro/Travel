import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/auth-context";

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
  hotel: boolean;
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

const wizardSteps = [
  { key: "country", label: "Country" },
  { key: "planning", label: "Planning" },
  { key: "city", label: "City" },
  { key: "hotel", label: "Hotel" },
  { key: "day-planning", label: "Days" },
  { key: "finish", label: "Finish" },
];

export const Trip: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAuth();

  const [tripData, setTripDataState] = useState<TripData>({});
  const [completed, setCompletedState] =
    useState<CompletedSteps>(DEFAULT_COMPLETED);

  const setTripData = (patch: Partial<TripData>) =>
    setTripDataState((prev) => ({ ...prev, ...patch }));
  const setCompleted = (patch: Partial<CompletedSteps>) =>
    setCompletedState((prev) => ({ ...prev, ...patch }));

  const currentStep = location.pathname.split("/").pop() || "country";
  const currentIndex = wizardSteps.findIndex((s) => s.key === currentStep);

  // Strict navigation
  useEffect(() => {
    if (currentStep === "country") return;
    if (currentStep === "planning" && !completed.country) {
      navigate("/trips/new/country", { replace: true });
    }
    if (currentStep === "finish" && !completed.dayPlanning) {
      navigate("/trips/new/day-planning", { replace: true });
    }
  }, [currentStep, completed, navigate]);

  const getTitle = () => {
    switch (currentStep) {
      case "country":
        return "Choose destination";
      case "planning":
        return "Trip dates";
      case "city":
        return "Choose city";
      case "hotel":
        return "Select hotel";
      case "day-planning":
        return "Plan days";
      case "finish":
        return "Done";
      default:
        return "New trip";
    }
  };

  const contextValue = useMemo(
    () => ({ tripData, setTripData, completed, setCompleted }),
    [tripData, completed]
  );
  if (!account) {
    navigate("/login");
    return null;
  }
  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        {/* Horizontal scroll progress */}
        <div className="overflow-x-auto px-2 pt-2">
          <div className="flex gap-1 min-w-max">
            {wizardSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full min-w-[40px] ${
                  i <= currentIndex
                    ? "bg-zinc-900 dark:bg-white"
                    : "bg-zinc-200 dark:bg-zinc-800"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] mt-1 text-zinc-500 dark:text-zinc-400 px-1">
            {wizardSteps.map((s) => (
              <span key={s.key}>{s.label}</span>
            ))}
          </div>
        </div>

        {/* Top bar */}
        <div className="h-12 px-3 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="text-zinc-900 dark:text-white" />
          </button>
          <h1 className="flex-1 text-center text-sm font-semibold">
            {getTitle()}
          </h1>
          <div className="w-8" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
          <Outlet context={contextValue} />
        </div>
      </div>
    </div>
  );
};

export default Trip;
