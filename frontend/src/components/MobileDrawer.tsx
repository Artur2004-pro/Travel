// React default import not required with the new JSX transform

export default function MobileDrawer({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate?: (key: string) => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Account</h3>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
              Close
            </button>
          </div>
          <nav className="mt-4 flex flex-col gap-2">
            {[
              "Profile",
              "Edit Profile",
              "Account Settings",
              "Security",
              "Notifications",
              "Appearance",
              "Logout",
            ].map((lbl) => (
              <button
                key={lbl}
                onClick={() => {
                  onNavigate?.(lbl.toLowerCase().replace(/\s+/g, "-"));
                  onClose();
                }}
                className="text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {lbl}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
