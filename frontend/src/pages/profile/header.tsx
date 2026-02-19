import { useRef, useEffect } from "react";
import type { IAccount } from "../../types";
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

  const redirected = useRef(false);
  useEffect(() => {
    if (!account && !redirected.current) {
      redirected.current = true;
      navigate("/login");
    }
  }, [account, navigate]);

  if (!account) return null;

  const avatarSrc = account.avatar
    ? baseUrl.current + account.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        account.username || "U"
      )}&background=e5e7eb&color=6b7280`;

  return (
    <div className="flex flex-col items-start gap-4 py-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0 shadow-sm">
            <img src={avatarSrc} alt={account.username || "user"} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-semibold">{account.username}</h1>
              <button
                onClick={onEdit}
                className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm font-medium hover:opacity-90 transition"
                aria-label="Edit profile"
              >
                Edit profile
              </button>
            </div>

            {account.bio && <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">{account.bio}</p>}
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-6">
          <div className="text-center">
            <div className="text-base font-semibold">{account.trips || 0}</div>
            <div className="text-xs text-neutral-500">Trips</div>
          </div>
          <div className="text-center">
            <div className="text-base font-semibold">{account.followers || 0}</div>
            <div className="text-xs text-neutral-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-base font-semibold">{account.following || 0}</div>
            <div className="text-xs text-neutral-500">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
}
