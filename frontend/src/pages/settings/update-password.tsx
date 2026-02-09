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

  const inputClass = `
    w-full
    rounded-xl
    px-4 py-3
    border border-zinc-300 dark:border-zinc-700
    bg-white dark:bg-black
    text-sm
    focus:outline-none
    focus:ring-1 focus:ring-black dark:focus:ring-white
    pr-11
  `;

  return (
    <div className="w-full max-w-[420px] mx-auto flex flex-col gap-6">
      {popup && <MessagePopup {...popup} />}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Change password</h1>
        <p className="text-sm text-zinc-500">
          Choose a strong password you don’t use elsewhere.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Current password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Current password</label>

          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              {...register("oldPassword", { required: true, minLength: 6 })}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition"
            >
              {showOld ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {errors.oldPassword && (
            <p className="text-xs text-red-500">Current password is required</p>
          )}
        </div>

        {/* New password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">New password</label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword", { required: true, minLength: 6 })}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition"
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {errors.newPassword && (
            <p className="text-xs text-red-500">New password is required</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-2
            w-full
            py-3
            rounded-xl
            text-sm
            font-semibold
            bg-black text-white
            dark:bg-white dark:text-black
            hover:opacity-90
            disabled:opacity-50
            transition
          "
        >
          {loading ? "Saving..." : "Change password"}
        </button>
      </form>
    </div>
  );
}
