// src/pages/settings/update-username-instagram.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Axios } from "../../lib/axios-config";
import { Eye, EyeOff } from "lucide-react";
import { MessagePopup } from "../components";
import type { IResponse } from "../../types";

type FormValues = {
  username: string;
  password: string;
};

export default function UpdateUsername() {
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

  const [showPassword, setShowPassword] = useState(false);

  const showMessage = (type: "success" | "error", text: string) => {
    setPopup({ type, text });
    setTimeout(() => setPopup(null), 2500);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data } = await Axios.post<IResponse>(
        "account/update-username",
        values
      );
      showMessage("success", data.message || "Username updated");
      reset();
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "Failed to update username"
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
        <h1 className="text-lg font-semibold">Change username</h1>
        <p className="text-sm text-zinc-500">
          Your username is visible to other users.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Username */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">New username</label>
          <input
            type="text"
            {...register("username", { required: true })}
            className={inputClass}
          />
          {errors.username && (
            <p className="text-xs text-red-500">Username is required</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Current password</label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80 transition"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">Password is required</p>
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
          {loading ? "Saving..." : "Update username"}
        </button>
      </form>
    </div>
  );
}
