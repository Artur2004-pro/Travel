import SettingsMobileHeader from "./settings-header-mobile";
import { useTheme } from "../../../hooks/useThem";
import { Sun, Moon } from "lucide-react";

export default function AppearanceSettings() {
  const { dark, toggle } = useTheme();

  return (
    <>
      <SettingsMobileHeader title="Appearance" />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {dark ? (
              <Moon className="w-5 h-5 text-neutral-500" strokeWidth={2} />
            ) : (
              <Sun className="w-5 h-5 text-neutral-500" strokeWidth={2} />
            )}
            <span className="text-sm font-medium">Theme</span>
          </div>
          <button
            onClick={toggle}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </>
  );
}
