import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SettingsSidebar from "./sidebar";
import Card from "../components/layout/card";
import { useAuth } from "../../context/auth-context";
import EditProfileForm from "./sections/edit-profile-form";
import AppearanceSettings from "./sections/appearance";
import UpdatePassword from "./update-password";
import UpdateUsername from "./update-username";

export default function SettingsLayout() {
  const { account } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) navigate("/login");
  }, [account, navigate]);

  return (
    <div className="min-h-screen flex bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 w-full">
      {/* placeholder for main app sidebar space on large screens */}
      <div className="hidden lg:block w-60" />

      {/* Settings sidebar: sticky and in-flow on md+ */}
      <SettingsSidebar />

      <main className="flex-1 flex justify-center min-w-0">
        <div className="w-full max-w-[480px] px-4 py-6 sm:py-10 pb-24 md:pb-10">
          <Card className="p-0">
            <div className="p-4 sm:p-6">
              {/* Desktop/tablet: use nested routes */}
              <div className="hidden md:block">
                <Outlet />
              </div>

              {/* Mobile: stack all settings sections vertically */}
              <div className="md:hidden space-y-6">
                <EditProfileForm />
                <AppearanceSettings />
                <UpdateUsername />
                <UpdatePassword />
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
