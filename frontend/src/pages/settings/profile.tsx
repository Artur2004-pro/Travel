import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { IAccount, IResponse } from "../../types";

export default function Profile() {
  const [account, setAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    Axios.get<IResponse<IAccount>>("account").then(({ data }) =>
      setAccount(data.payload)
    );
  }, []);

  if (!account) return null;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-md overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors">
      {/* Cover */}
      <div className="relative h-32 bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400">
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden shadow-lg">
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
      <div className="mt-12 px-6 pb-6 text-center space-y-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {account.username}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {account.email}
        </p>
      </div>

      {/* Details */}
      <div className="px-6 pb-6 space-y-2 text-sm">
        <div className="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-zinc-500 dark:text-zinc-400">Username</span>
          <span className="font-medium">{account.username}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-zinc-500 dark:text-zinc-400">Email</span>
          <span className="font-medium">{account.email}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-500 dark:text-zinc-400">Role</span>
          <span className="font-medium">{account.role}</span>
        </div>
      </div>
    </div>
  );
}
