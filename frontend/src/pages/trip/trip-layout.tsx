import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";

export const TripDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAuth();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
  }, [account, navigate]);

  const isWizard = location.pathname.startsWith("/trips/new");

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 h-14 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <h1 className="text-base font-semibold">
          {isWizard ? "New trip" : "My Trips"}
        </h1>
        {!isWizard && (
          <button
            onClick={() => navigate("/trips/new/country")}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <Plus className="w-5 h-5" strokeWidth={2} />
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TripDashboard;
