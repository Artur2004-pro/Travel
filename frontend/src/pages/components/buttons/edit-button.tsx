import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface BaseButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
  small?: boolean; 
  medium?: boolean;
  large?: boolean;
}

const sizeClasses: Record<string, string> = {
  small: "px-2 py-1 text-xs gap-1",
  medium: "px-3 py-2 text-sm gap-2",
  large: "px-4 py-3 text-base gap-3",
};

export const EditButton = ({
  onClick,
  label = "Edit",
  className,
  small,
  medium,
  large,
  to,
}: BaseButtonProps & { to: string }) => {
  const navigate = useNavigate();

  // որոշում ենք size-ը՝ boolean props-ի հիման վրա, եթե size prop-ը տրված չէ
  const appliedSize: string =
    small ? "small" : medium ? "medium" : large ? "large" : "medium";

  return (
    <button
      onClick={() => (onClick ? onClick() : navigate(to))}
      className={`
        inline-flex items-center justify-center rounded-full font-medium transition shadow-sm hover:shadow-md
        bg-blue-500/20 dark:bg-blue-600/20 text-white hover:bg-blue-500/40
        ${sizeClasses[appliedSize]}
        ${className || ""}
      `}
    >
      <Edit className={`h-4 w-4 ${appliedSize === "large" ? "h-5 w-5" : ""}`} />
      {label && <span className="hidden sm:inline">{label}</span>}
    </button>
  );
};
