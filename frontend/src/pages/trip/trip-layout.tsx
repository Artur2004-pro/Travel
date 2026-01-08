import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";

export const TripDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAuth();
  useEffect(() => {
    if (!account) {
      navigate("/login");
      return;
    }
  }, [account, navigate]);

  const isWizard = location.pathname.startsWith("/trips/new");
  return (
    <div className="flex-1 flex justify-center px-6 pt-24">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
          {/* TOP BAR */}
          <header className="fixed inset-x-0 top-0 z-10 h-12 flex items-center justify-around px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur">
            <h1 className="text-sm font-semibold">
              {isWizard ? "New trip" : "My Trips"}
            </h1>

            {!isWizard && (
              <button onClick={() => navigate("/trips/new/country")}>
                <PlusCircle className="w-5 h-5" />
              </button>
            )}
          </header>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;
