import { useEffect, useState } from "react";
import { Axios } from "../../../lib/axios-config";
import type { IAccount, IResponse } from "../../../types";
import SettingsMobileHeader from "./settings-header-mobile";

export default function EditProfileForm() {
  const [account, setAccount] = useState<IAccount | null>(null);

  useEffect(() => {
    Axios.get<IResponse<IAccount>>("account").then(({ data }) =>
      setAccount(data.payload)
    );
  }, []);

  if (!account) return null;

  return (
    <>
      <SettingsMobileHeader title="Edit profile" />

      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center gap-4">
          <img
            src={account.avatar}
            className="w-16 h-16 rounded-full object-cover"
          />
          <button className="text-sm font-semibold text-blue-500">
            Change profile photo
          </button>
        </div>

        {[
          { label: "Username", value: account.username },
          { label: "Email", value: account.email },
        ].map((f) => (
          <div key={f.label} className="flex flex-col gap-1">
            <label className="text-xs text-zinc-500">{f.label}</label>
            <input
              defaultValue={f.value}
              className="border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
          </div>
        ))}

        <button className="mt-4 w-full py-2 rounded-md bg-blue-500 text-white font-semibold">
          Save changes
        </button>
      </div>
    </>
  );
}
