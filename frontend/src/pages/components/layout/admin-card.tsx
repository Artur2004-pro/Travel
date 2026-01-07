import React from "react";

type Props = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export const AdminCard = ({ title, icon, children }: Props) => {
  return (
    <section
      className="
        rounded-2xl
        bg-white dark:bg-zinc-950
        border border-zinc-200/60 dark:border-zinc-800/60
        shadow-sm
      "
    >
      {/* Header */}
      <div
        className="
          flex items-center gap-2
          px-4 py-3
          border-b border-zinc-200/60 dark:border-zinc-800/60
        "
      >
        {icon && (
          <span className="text-zinc-400 dark:text-zinc-500">{icon}</span>
        )}
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </section>
  );
};
