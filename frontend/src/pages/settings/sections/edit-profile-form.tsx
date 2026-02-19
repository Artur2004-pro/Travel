import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SettingsMobileHeader from "./settings-header-mobile";
import { useAuth } from "../../../context/auth-context";
import { Axios } from "../../../lib/axios-config";
import { MessagePopup } from "../../components";

export default function EditProfileForm() {
  const { account, refetchAccount } = useAuth();
  const navigate = useNavigate();
  const baseUrl = useRef(import.meta.env.VITE_APP_DOMAIN);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2500);
  };

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      await Axios.patch("account/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "Avatar updated");
      await refetchAccount();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      showMessage("error", axiosErr?.response?.data?.message || "Failed to update avatar");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!account) return null;

  return (
    <>
      <SettingsMobileHeader title="Edit profile" />
      {message && <MessagePopup {...message} />}
      <div className="flex flex-col gap-6 px-4 py-6">
        <div className="flex items-center gap-4">
          <img
            src={account.avatar ? (baseUrl.current || "") + account.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(account.username || "U")}&background=e5e7eb&color=6b7280`}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
          />
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="text-sm font-semibold text-neutral-900 dark:text-white hover:underline disabled:opacity-50"
            >
              {loading ? "Uploading…" : "Change profile photo"}
            </button>
            <p className="text-xs text-neutral-500 mt-0.5">Username and email: update in Account</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-500">Username</label>
            <input
              value={account.username}
              readOnly
              className="w-full rounded-lg px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-500 cursor-not-allowed"
            />
            <p className="text-xs text-neutral-400">
              Change in{" "}
              <button
                type="button"
                onClick={() => navigate("/settings/account")}
                className="underline"
              >
                Account
              </button>
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-neutral-500">Email</label>
            <input
              value={account.email}
              readOnly
              className="w-full rounded-lg px-4 py-2.5 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </>
  );
}
