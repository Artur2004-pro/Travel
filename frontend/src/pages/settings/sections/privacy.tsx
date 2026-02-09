import { useState, useEffect } from "react";
import SettingsMobileHeader from "./settings-header-mobile";
import { useAuth } from "../../../context/auth-context";
import { Axios } from "../../../lib/axios-config";
import { MessagePopup } from "../../components";
import type { IResponse } from "../../../types";

export default function PrivacySettings() {
  const { account, refetchAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [value, setValue] = useState<"public" | "private">("public");

  useEffect(() => {
    if (account?.defaultTripVisibility) {
      setValue(account.defaultTripVisibility);
    }
  }, [account?.defaultTripVisibility]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2500);
  };

  const handleChange = async (next: "public" | "private") => {
    setLoading(true);
    try {
      await Axios.patch<IResponse>("account/preferences", {
        defaultTripVisibility: next,
      });
      setValue(next);
      await refetchAccount();
      showMessage("success", "Preferences updated");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      showMessage("error", axiosErr?.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SettingsMobileHeader title="Privacy" />
      {message && <MessagePopup {...message} />}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm font-medium">Default trip visibility</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              New trips will be {value === "public" ? "visible to others" : "private by default"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleChange("public")}
              disabled={loading}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                value === "public"
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              } disabled:opacity-50`}
            >
              Public
            </button>
            <button
              onClick={() => handleChange("private")}
              disabled={loading}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                value === "private"
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              } disabled:opacity-50`}
            >
              Private
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
