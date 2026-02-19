import React from "react";

export default function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          {description ? <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p> : null}
        </div>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
