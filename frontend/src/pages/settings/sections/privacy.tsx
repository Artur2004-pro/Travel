import SettingsMobileHeader from "./settings-header-mobile";

export default function PrivacySettings() {
  return (
    <>
      <SettingsMobileHeader title="Privacy" />

      <div className="divide-y border-t border-zinc-200 dark:border-zinc-800">
        {["Private account", "Hide activity status"].map((item) => (
          <div
            key={item}
            className="flex justify-between px-4 py-4 items-center"
          >
            <span className="text-sm">{item}</span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-500 rounded-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}
