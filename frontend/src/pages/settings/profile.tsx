import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { IAccount, IResponse } from "../../types";
import { Settings } from "lucide-react";

export default function Profile() {
  const [account, setAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    Axios.get<IResponse<IAccount>>("account").then(({ data }) =>
      setAccount(data.payload)
    );
  }, []);

  if (!account) return null;

  return (
    <div className="mx-auto w-full max-w-[935px] px-4">
      {/* Top section */}
      <section className="flex gap-8 py-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-36 h-36 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
            {account.avatar ? (
              <img
                src={account.avatar}
                alt={account.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800" />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          {/* Username + actions */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-normal">{account.username}</h1>

            <button
              className="
                px-4 py-1.5 text-sm font-semibold
                border border-zinc-300 dark:border-zinc-700
                rounded-lg
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-colors
              "
            >
              Edit profile
            </button>

            <button
              className="
                p-2 rounded-full
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-colors
              "
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <span>
              <strong className="font-semibold">0</strong> posts
            </span>
            <span>
              <strong className="font-semibold">0</strong> followers
            </span>
            <span>
              <strong className="font-semibold">0</strong> following
            </span>
          </div>

          {/* Bio */}
          <div className="text-sm">
            <div className="font-semibold">{account.username}</div>
            <div className="text-zinc-600 dark:text-zinc-300">
              {account.email}
            </div>
            <div className="text-zinc-500">Role: {account.role}</div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-zinc-200 dark:border-zinc-800" />

      {/* Empty posts state */}
      <section className="py-12 text-center text-sm text-zinc-500">
        No posts yet
      </section>
    </div>
  );
}
