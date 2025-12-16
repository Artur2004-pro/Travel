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
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-12">
      <button
        onClick={onCopyFromPrevious}
        disabled={!canCopyFromPrevious}
        className="px-10 py-5 rounded-2xl border border-zinc-500 hover:bg-white/10 transition text-xl disabled:opacity-50"
      >
        Պատճենել նախորդ օրվանից
      </button>

      <button
        onClick={onSave}
        disabled={saving || !hasCity}
        className="px-20 py-7 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-2xl shadow-2xl disabled:opacity-50 transition flex items-center gap-4"
      >
        {saving ? "Պահպանվում է..." : "Պահպանել և շարունակել →"}
      </button>
    </div>

    <div className="text-center pt-8">
      <button
        onClick={onSkipAll}
        className="text-zinc-400 hover:text-white text-lg underline"
      >
        Բաց թողնել օրերի պլանավորումը
      </button>
    </div>
  </>
);
