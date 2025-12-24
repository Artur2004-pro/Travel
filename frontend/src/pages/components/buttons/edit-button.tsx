import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EditButton = ({
  onClick,
  to,
  label = "Edit",
}: {
  onClick?: () => void;
  to?: string;
  label?: string;
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => (to ? navigate(to) : onClick?.())}
      className="
        inline-flex items-center justify-center sm:justify-start gap-2
        rounded-full px-3 py-2 text-sm font-medium
        bg-sky-500/20 dark:bg-sky-600/20
        text-sky-600 dark:text-sky-400
        hover:bg-sky-500/30 dark:hover:bg-sky-500/30
        transition
      "
    >
      <Pencil className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};
