import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  subtitle?: string;
  stepIndex: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  children: React.ReactNode;
};

export const TripStepLayout: React.FC<Props> = ({
  title,
  subtitle,
  stepIndex,
  totalSteps,
  onNext,
  onBack,
  nextDisabled,
  nextLabel,
  children,
}) => {
  const navigate = useNavigate();
  

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {subtitle && <div className="text-sm text-zinc-500">{subtitle}</div>}
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-zinc-500">
            {stepIndex}/{totalSteps}
          </div>
        </div>

        {/* Single-column layout — the fixed wizard aside is rendered by the parent page on desktop. */}
        <div className="mt-6 grid grid-cols-1 gap-6">
          <main>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 md:p-6 shadow-sm">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 shadow-xl">
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (onBack) return onBack();
              navigate(-1);
            }}
            className="flex-1 py-3 rounded-full bg-white/5 text-sm font-medium"
          >
            Back
          </button>
          <button
            onClick={() => onNext && onNext()}
            disabled={Boolean(nextDisabled)}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold disabled:opacity-50"
          >
            {nextLabel || "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripStepLayout;
