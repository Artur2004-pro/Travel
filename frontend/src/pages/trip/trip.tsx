import React, { useEffect, useMemo, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { TripWizardProvider, useTripWizard } from '../../context/trip-wizard-context';

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

  // page titles are handled inside individual steps

  const contextValue = useMemo(
    () => ({ tripData, setTripData, completed, setCompleted }),
    [tripData, completed]
  );
  const redirected = useRef(false);
  useEffect(() => {
    if (!account && !redirected.current) {
      redirected.current = true;
      setTimeout(() => navigate("/login"), 0);
    }
  }, [account, navigate]);
  if (!account) return null;
  const isWizard = location.pathname.startsWith("/trips/new");

  // helper components that use the wizard context
  const WizardNav: React.FC = () => {
    const wizard = useTripWizard();
    return (
      <nav className="flex-1 space-y-2">
        {wizardSteps.map((s, i) => (
          <button
            key={s.key}
            onClick={() => wizard.goToStep(s.key)}
            className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 transition-colors ${
              i === currentIndex
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800'
            }`}
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full text-xs bg-white/10">{i + 1}</span>
            <span className="text-sm truncate">{s.label}</span>
          </button>
        ))}
      </nav>
    );
  };

  const MobileWizardBar: React.FC = () => {
    const wizard = useTripWizard();
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-black/95 border-t border-neutral-200 dark:border-neutral-800 px-4 py-3">
        <div className="flex gap-3">
          <button
            onClick={() => wizard.back()}
            className="flex-1 py-3 rounded-full bg-white border text-sm"
          >
            Back
          </button>
          <button
            onClick={() => wizard.next()}
            disabled={wizard.loading}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm disabled:opacity-60"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <TripWizardProvider>
      <div className="flex-1 flex min-h-screen bg-white dark:bg-black">
        {/* Desktop: left stepper for wizard, hidden on small screens */}
        {isWizard && (
          <aside className="hidden md:flex md:flex-col md:w-56 lg:w-64 p-4 fixed md:left-[80px] lg:left-[260px] top-16 h-[calc(100vh-64px)] overflow-auto border-r border-neutral-100 dark:border-neutral-800 bg-white/5 dark:bg-black/5 z-30">
            <div className="mb-4">
              <h2 className="text-sm font-semibold">New trip</h2>
              <p className="text-xs text-neutral-500 mt-1">Follow the steps to create your trip</p>
            </div>
            <WizardNav />
          </aside>
        )}

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-20 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
            <div className="h-14 flex items-center justify-between px-4">
              <h1 className="text-base font-semibold">{isWizard ? 'New trip' : 'My Trips'}</h1>
              {!isWizard ? (
                <button
                  onClick={() => navigate('/trips/new/country')}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  {/* desktop progress */}
                  <div className="hidden md:block text-sm text-neutral-500">Step {currentIndex + 1} / {wizardSteps.length}</div>
                </div>
              )}
            </div>

            {/* mobile progress bar */}
            {isWizard && (
              <div className="md:hidden px-3 py-2">
                <div className="overflow-x-auto">
                  <div className="flex gap-2 min-w-max">
                    {wizardSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full min-w-[40px] ${i <= currentIndex ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className={`max-w-feed mx-auto px-4 py-6 ${isWizard ? 'md:ml-[312px] xl:ml-[520px]' : ''}`}>
              <Outlet context={contextValue} />
            </div>
          </main>

          {/* Mobile wizard navigation (Next / Back) */}
          {isWizard && <MobileWizardBar />}
        </div>
      </div>
    </TripWizardProvider>
  );
};

export default Trip;
