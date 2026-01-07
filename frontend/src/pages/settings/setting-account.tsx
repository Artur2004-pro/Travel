// src/pages/settings/settings-profile.tsx
import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { IAccount, IResponse } from "../../types";

export default function AccountInfo() {
  const [account, setAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    Axios.get<IResponse<IAccount>>("account").then(({ data }) =>
      setAccount(data.payload)
    );
  }, []);

  if (!account) return null;

  return (
    <div className="mx-auto w-full max-w-[470px]">
      {/* Section */}
      <div className="border-t border-b border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800">
        {/* Username */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm text-zinc-500">Username</span>
          <span className="text-sm font-medium">{account.username}</span>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm text-zinc-500">Email</span>
          <span className="text-sm font-medium">{account.email}</span>
        </div>

        {/* Role */}
        <div className="flex items-center justify-between px-4 py-4">
          <span className="text-sm text-zinc-500">Role</span>
          <span className="text-sm font-medium">{account.role}</span>
        </div>
      </div>
    </div>
  );
}
