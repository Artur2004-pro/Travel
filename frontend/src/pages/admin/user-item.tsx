import type { IAccountProps } from "../../types";
import { EditButton } from "../components";
import { UserCircle2, MoreHorizontal } from "lucide-react";

export const UserItem = ({ account }: IAccountProps) => {
  return (
    <article
      className="
        group
        relative
        rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-black
        p-4
        transition
        hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {account.avatar ? (
          <img
            src={account.avatar}
            alt={account.username}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <UserCircle2 className="h-6 w-6 text-zinc-400" />
          </div>
        )}

        {/* Identity */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold truncate">{account.username}</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {account.email}
          </p>
        </div>

        {/* Actions (hover on desktop) */}
        <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
          <EditButton to={`/admin/users/${account._id}`} small />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex gap-2 text-xs">
        <span
          className={`px-2 py-1 rounded-md border ${
            account.role === "admin"
              ? "border-emerald-400/30 text-emerald-500"
              : "border-sky-400/30 text-sky-500"
          }`}
        >
          {account.role}
        </span>

        <span
          className={`px-2 py-1 rounded-md border ${
            account.isBlocked
              ? "border-rose-400/30 text-rose-500"
              : "border-emerald-400/30 text-emerald-500"
          }`}
        >
          {account.isBlocked ? "Blocked" : "Active"}
        </span>
      </div>
    </article>
  );
};

export default UserItem;
