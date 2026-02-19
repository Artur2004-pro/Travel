import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileDrawer from "../components/MobileDrawer";
import SettingsSection from "../components/SettingsSection";
import useTheme from "../hooks/useTheme";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-14 h-8 flex items-center p-1 rounded-full transition-colors ${
        checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
      }`}
      aria-pressed={checked}
    >
      <span className={`bg-white w-6 h-6 rounded-full shadow transform transition-transform ${checked ? "translate-x-6" : "translate-x-0"}`} />
    </button>
  );
}

export default function SettingsUI() {
  const [drawer, setDrawer] = useState(false);
  const { theme, toggle } = useTheme();
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="min-h-screen px-4 py-6">
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:gap-6">
        <Sidebar />
        <main className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button onClick={() => setDrawer(true)} className="p-2 rounded-md bg-white/60 dark:bg-slate-900/60 shadow">Menu</button>
            <div className="text-lg font-semibold">Settings</div>
          </div>

          <SettingsSection title="Account Information" description="Manage your public profile and contact details.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <div className="text-sm text-slate-600 dark:text-slate-300">Display name</div>
                <input className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800" defaultValue="Artur Bardiner" />
              </label>
              <label className="block">
                <div className="text-sm text-slate-600 dark:text-slate-300">Email</div>
                <input className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800" defaultValue="artur@example.com" />
              </label>
            </div>
          </SettingsSection>

          <SettingsSection title="Privacy" description="Control who sees your content and profile details.">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Private account</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">When enabled, only approved followers can see your content.</div>
              </div>
              <Toggle checked={false} onChange={() => {}} />
            </div>
          </SettingsSection>

          <SettingsSection title="Password Change" description="Update your account password regularly to keep your account secure.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input placeholder="Current password" type="password" className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800" />
              <input placeholder="New password" type="password" className="mt-1 block w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800" />
            </div>
            <div className="mt-3">
              <button className="px-4 py-2 rounded-md bg-indigo-600 text-white">Change password</button>
            </div>
          </SettingsSection>

          <SettingsSection title="Notifications" description="Choose which events send you alerts.">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email notifications</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Receive summaries and important updates via email.</div>
              </div>
              <Toggle checked={emailNotif} onChange={setEmailNotif} />
            </div>
          </SettingsSection>

          <SettingsSection title="Theme" description="Switch between Light and Dark themes.">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Current: {theme}</div>
              </div>
              <div>
                <button onClick={toggle} className="px-4 py-2 rounded-md bg-white dark:bg-slate-800 border">Toggle theme</button>
              </div>
            </div>
          </SettingsSection>
        </main>
      </div>
    </div>
  );
}
