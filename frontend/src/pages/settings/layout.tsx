import { Outlet, useNavigate } from "react-router-dom";
import SettingsSidebar from "./sidebar";
import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";

export default function SettingsLayout() {
  const { account } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!account) {
      navigate("/login");
      return;
    }
  }, [account, navigate]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar only visible on desktop */}
      <SettingsSidebar />

      {/* Main content */}
      <main className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-[600px] pt-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
