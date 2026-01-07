import { useForm } from "react-hook-form";
import { useState } from "react";
import { Axios } from "../../lib/axios-config";
import { MessagePopup } from "../components";
import { Eye, EyeOff } from "lucide-react";
import type { IResponse } from "../../types";

type FormValues = {
  oldPassword: string;
  newPassword: string;
};

export default function UpdatePassword() {
  const {
    handleSubmit,
    register,
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

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      const { data } = await Axios.post<IResponse>(
        "account/update-password",
        values
      );
      showMessage("success", (data as any).message || "Password updated");
      reset();
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[470px] px-4 py-6">
      {popup && <MessagePopup {...popup} />}

      {/* Title */}
      <h1 className="text-lg font-semibold mb-6">Change password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Old password */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-500">Current password</label>

          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              {...register("oldPassword", {
                required: "Current password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="
                w-full rounded-md px-3 py-2 pr-10
                border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-black
                text-sm
                focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
              "
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
          </div>

          {errors.oldPassword && (
            <p className="text-xs text-red-500">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New password */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-500">New password</label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="
                w-full rounded-md px-3 py-2 pr-10
                border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-black
                text-sm
                focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
              "
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
          </div>

          {errors.newPassword && (
            <p className="text-xs text-red-500">{errors.newPassword.message}</p>
          )}

          <p className="text-xs text-zinc-500">
            Password must be at least 6 characters.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 text-sm font-semibold
            rounded-md
            bg-black text-white dark:bg-white dark:text-black
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Change password"}
        </button>
      </form>
    </div>
  );
}
