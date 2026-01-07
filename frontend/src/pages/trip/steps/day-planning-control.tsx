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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-zinc-100 tracking-tight">
          Plan Your Trip Days
        </h1>

        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="
              px-5 py-2.5 rounded-2xl
              bg-white/5 dark:bg-zinc-800 border border-white/10 dark:border-zinc-700
              text-white dark:text-zinc-100 text-sm
              hover:bg-white/10 dark:hover:bg-zinc-700
              shadow-sm hover:shadow-md
              transition-all
              active:scale-[0.97]
            "
          >
            Skip
          </button>

          <button
            onClick={onFinish}
            className="
              px-6 py-2.5 rounded-2xl
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white text-sm sm:text-base font-semibold
              shadow-lg hover:shadow-xl
              transition-all
              active:scale-[0.97]
            "
          >
            Finish
          </button>
        </div>
      </div>

      {/* MOBILE – INSTAGRAM STYLE BOTTOM BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onSkip}
            className="
              flex-1 py-3 rounded-xl
              bg-white/5 dark:bg-zinc-800
              text-white dark:text-zinc-100 text-sm font-medium
              active:scale-[0.97]
              shadow-sm hover:shadow-md
              transition-all
            "
          >
            Skip
          </button>

          <button
            onClick={onFinish}
            className="
              flex-[1.5] py-3 rounded-xl
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white text-sm font-semibold
              shadow-lg hover:shadow-xl
              active:scale-[0.97]
              transition-all
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
