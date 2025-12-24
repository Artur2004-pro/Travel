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
    <>
      {/* DESKTOP / TABLET */}
      <div className="hidden sm:flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Plan Your Trip Days
        </h1>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="
              px-5 py-2.5 rounded-full
              bg-white/5 border border-white/10
              text-white text-sm
              hover:bg-white/10
              transition
            "
          >
            Skip
          </button>

          <button
            onClick={onFinish}
            className="
              px-6 py-2.5 rounded-full
              bg-blue-600
              text-white text-sm font-medium
              hover:bg-blue-500
              transition
            "
          >
            Finish
          </button>
        </div>
      </div>

      {/* MOBILE – INSTAGRAM STYLE BOTTOM BAR */}
      <div
        className="
          sm:hidden
          fixed bottom-0 left-0 right-0 z-40
          bg-black/80 backdrop-blur-xl
          border-t border-white/10
          px-4 py-3
        "
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="
              flex-1 py-3 rounded-xl
              bg-white/5
              text-white text-sm font-medium
              active:scale-[0.98]
              transition
            "
          >
            Skip
          </button>

          <button
            onClick={onFinish}
            className="
              flex-[1.5] py-3 rounded-xl
              bg-blue-600
              text-white text-sm font-semibold
              active:scale-[0.98]
              transition
            "
          >
            Finish
          </button>
        </div>
      </div>

      {/* MOBILE SAFE SPACE */}
      <div className="sm:hidden h-20" />
    </>
  );
};

export default DayPlanningControls;
