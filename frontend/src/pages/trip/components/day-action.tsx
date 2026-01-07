import React from "react";
import type { DayActionsProps } from "../trip.types";

export const DayActions: React.FC<DayActionsProps> = ({
  canCopyFromPrevious,
  onCopyFromPrevious,
  saving,
  hasCity,
  onSave,
  onSkipAll,
}) => (
  <>
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center pt-8 sm:pt-12">
      {/* Copy from previous day */}
      <button
        onClick={onCopyFromPrevious}
        disabled={!canCopyFromPrevious}
        className="px-6 sm:px-10 py-3 sm:py-5 rounded-2xl border border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-base sm:text-xl disabled:opacity-50 shadow-sm hover:shadow-md"
      >
        Պատճենել նախորդ օրվանից
      </button>

      {/* Save and continue */}
      <button
        onClick={onSave}
        disabled={saving || !hasCity}
        className="px-12 sm:px-20 py-4 sm:py-7 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg sm:text-2xl shadow-2xl disabled:opacity-50 transition flex items-center justify-center gap-3 sm:gap-4"
      >
        {saving ? "Պահպանվում է..." : "Պահպանել և շարունակել →"}
      </button>
    </div>

    {/* Skip all days */}
    <div className="text-center pt-6 sm:pt-8">
      <button
        onClick={onSkipAll}
        className="text-zinc-500 dark:text-zinc-400 hover:text-white dark:hover:text-white text-base sm:text-lg underline transition-colors"
      >
        Բաց թողնել օրերի պլանավորումը
      </button>
    </div>
  </>
);
