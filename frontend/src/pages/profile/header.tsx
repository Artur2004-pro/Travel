import { useRef } from "react";
import type { IAccount } from "../../types";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({
  account,
  onEdit,
}: {
  account: IAccount | null;
  onEdit: () => void;
}) {
  const baseUrl = useRef(import.meta.env.VITE_APP_DOMAIN || "");
  const navigate = useNavigate();

  if (!account) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 py-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
        <img
          src={account.avatar ? baseUrl.current + account.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(account.username || "U")}&background=e5e7eb&color=6b7280`}
          alt={account.username}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
        <h1 className="text-xl font-semibold">{account.username}</h1>
        <button
          onClick={onEdit}
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Edit profile"
        >
          <Settings size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
