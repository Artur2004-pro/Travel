import { Trash2 } from "lucide-react";

type ButtonSize = "small" | "medium" | "large";

interface BaseButtonProps {
  onClick?: (id: string) => void;
  label?: string;
  className?: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}
const sizeClasses: Record<ButtonSize, string> = {
  small: "px-2 py-1 text-xs gap-1",
  medium: "px-3 py-2 text-sm gap-2",
  large: "px-4 py-3 text-base gap-3",
};
export const DeleteButton = ({
  onClick,
  label = "Delete",
  className,
  small,
  medium,
  large,
  id,
}: BaseButtonProps & { id: string }) => {
  const size = small ? "small" : medium ? "medium" : large ? "large" : "medium";
  return (
    <button
      onClick={() => onClick?.(id)}
      className={`
        inline-flex items-center justify-center rounded-full font-medium transition shadow-sm hover:shadow-md
        bg-red-500/20 dark:bg-red-600/20 text-white hover:bg-red-500/40
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <Trash2 className={`h-4 w-4 ${size === "large" ? "h-5 w-5" : ""}`} />
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
};
