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
      <button
        onClick={onCopyFromPrevious}
        disabled={!canCopyFromPrevious}
        className="px-6 sm:px-10 py-3 sm:py-5 rounded-2xl border border-zinc-500 hover:bg-white/10 transition text-base sm:text-xl disabled:opacity-50 shadow-sm hover:shadow-md"
      >
        Պատճենել նախորդ օրվանից
      </button>

      <button
        onClick={onSave}
        disabled={saving || !hasCity}
        className="px-12 sm:px-20 py-4 sm:py-7 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-lg sm:text-2xl shadow-2xl disabled:opacity-50 transition flex items-center justify-center gap-3 sm:gap-4"
      >
        {saving ? "Պահպանվում է..." : "Պահպանել և շարունակել →"}
      </button>
    </div>

    <div className="text-center pt-6 sm:pt-8">
      <button
        onClick={onSkipAll}
        className="text-zinc-400 hover:text-white text-base sm:text-lg underline transition-colors"
      >
        Բաց թողնել օրերի պլանավորումը
      </button>
    </div>
  </>
);
