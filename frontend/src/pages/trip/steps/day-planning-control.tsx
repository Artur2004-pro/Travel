// src/pages/DayPlanningControls.tsx
import React from "react";

interface DayPlanningControlsProps {
  onSkip: () => void;
  onFinish: () => void;
}

const DayPlanningControls: React.FC<DayPlanningControlsProps> = ({
  onSkip,
  onFinish,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-3">
      <h1 className="text-2xl font-semibold text-white tracking-wide">
        Plan Your Trip Days
      </h1>

      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="
            px-5 py-3 rounded-xl
            bg-white/[0.04]
            border border-white/10
            text-white
            hover:bg-white/[0.08]
            backdrop-blur-xl
            transition
          "
        >
          Skip
        </button>

        <button
          onClick={onFinish}
          className="
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-medium
            shadow-lg shadow-indigo-900/40
            hover:opacity-90
            transition
          "
        >
          Go to Finish
        </button>
      </div>
    </div>
  );
};

export default DayPlanningControls;
