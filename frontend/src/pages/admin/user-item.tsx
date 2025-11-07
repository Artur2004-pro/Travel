import { EditButton } from "../components";
import { UserCircle2 } from "lucide-react";
import type { IAccountProps } from "../../types";

export const UserItem = ({ account }: IAccountProps) => {
  return (
    <div className="flex flex-col items-center text-center rounded-3xl border border-slate-800/50 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-950/80 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6 hover:border-sky-500/40">
      {/* Avatar */}
      {account.avatar ? (
        <img
          src={account.avatar}
          alt={account.username}
          className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-sky-500/30 mb-3"
        />
      ) : (
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-500/30 to-teal-400/30 flex items-center justify-center mb-3 ring-2 ring-sky-400/20">
          <UserCircle2 className="h-8 w-8 text-sky-400" />
        </div>
      )}

      {/* Info */}
      <div className="space-y-0.5">
        <h3 className="font-semibold text-zinc-100 text-base truncate max-w-[180px]">
          {account.username}
        </h3>
        <p className="text-xs text-zinc-500 truncate max-w-[200px]">
          {account.email}
        </p>
      </div>

      {/* Role & Status */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs font-medium">
        <span
          className={`px-3 py-1 rounded-lg ${
            account.role === "admin"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20"
              : "bg-sky-500/10 text-sky-400 border border-sky-400/20"
          }`}
        >
          {account.role}
        </span>
        <span
          className={`px-3 py-1 rounded-lg ${
            account.isBlocked
              ? "bg-rose-500/10 text-rose-400 border border-rose-400/20"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20"
          }`}
        >
          {account.isBlocked ? "Blocked" : "Active"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-5 w-full">
        <EditButton to={`/admin/users/${account._id}`} />
      </div>
    </div>
  );
};
