// src/pages/settings/update-password-instagram.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Axios } from "../../lib/axios-config";
import { Eye, EyeOff } from "lucide-react";
import { MessagePopup } from "../components";
import type { IResponse } from "../../types";

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const showMessage = (type: "success" | "error", text: string) => {
    setPopup({ type, text });
    setTimeout(() => setPopup(null), 2500);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data } = await Axios.post<IResponse>(
        "account/update-password",
        values
      );
      showMessage("success", data.message || "Password updated");
      reset();
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white pr-10";

  return (
    <div className="mx-auto w-full max-w-[470px] flex flex-col gap-6 p-4 md:p-6">
      {popup && <MessagePopup {...popup} />}
      <h1 className="text-lg font-semibold">Change Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="relative">
          <label className="text-sm text-zinc-500 mb-1 block">
            Current password
          </label>
          <input
            type={showOld ? "text" : "password"}
            {...register("oldPassword", { required: true, minLength: 6 })}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50"
          >
            {showOld ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
          {errors.oldPassword && (
            <p className="text-xs text-red-500">Current password required</p>
          )}
        </div>

        <div className="relative">
          <label className="text-sm text-zinc-500 mb-1 block">
            New password
          </label>
          <input
            type={showNew ? "text" : "password"}
            {...register("newPassword", { required: true, minLength: 6 })}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50"
          >
            {showNew ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
          {errors.newPassword && (
            <p className="text-xs text-red-500">New password required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-sm font-semibold rounded-md bg-black text-white dark:bg-white dark:text-black disabled:opacity-50"
        >
          {loading ? "Saving..." : "Change password"}
        </button>
      </form>
    </div>
  );
}
