// ProfileHeader.tsx
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
  const navigate = useNavigate();
  if (!account) {
    navigate("/login");
    return null;
  }
  const baseUrl = useRef(import.meta.env.VITE_APP_DOMAIN || "");
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <img
          src={baseUrl.current + account.avatar}
          alt={account.username}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
        <h1 className="text-2xl font-semibold">{account.username}</h1>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
        >
          <Settings size={32} />
        </button>
      </div>
    </div>
  );
}
