import { Plus } from "lucide-react";

type ButtonSize = "small" | "medium" | "large";

interface BaseButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  size?: ButtonSize;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

// Utility function to map size to Tailwind classes
const sizeClasses: Record<ButtonSize, string> = {
  small: "px-2 py-1 text-xs gap-1",
  medium: "px-3 py-2 text-sm gap-2",
  large: "px-4 py-3 text-base gap-3",
};

export const AddButton = ({
  onClick,
  label = "Add",
  className,
  small,
  medium,
  large,
}: BaseButtonProps) => {
  const size = small ? "small" : medium ? "medium" : large ? "large" : "medium";
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-full font-medium transition shadow-sm hover:shadow-md
        bg-emerald-500/20 dark:bg-emerald-600/20 text-white hover:bg-emerald-500/40
      ${sizeClasses[size]}
      ${className}
    `}
    >
      <Plus className={`h-4 w-4 ${size === "large" ? "h-5 w-5" : ""}`} />
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
}
