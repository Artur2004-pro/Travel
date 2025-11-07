import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = ({
  to,
  label = "Back",
  className = "",
}: {
  to?: string;
  label?: string;
  className?: string;
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border border-zinc-300 dark:border-slate-700 hover:bg-zinc-100/60 dark:hover:bg-slate-800/60 transition ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
};
