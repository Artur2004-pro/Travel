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

  const inputClass =
    "w-full rounded-md px-3 py-2 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white pr-10";

  return (
    <div className="mx-auto w-full max-w-[470px] flex flex-col gap-6 p-4 md:p-6">
      {popup && <MessagePopup {...popup} />}
      <h1 className="text-lg font-semibold">Change Username</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-zinc-500 mb-1 block">
            New username
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className={inputClass}
          />
          {errors.username && (
            <p className="text-xs text-red-500">Username required</p>
          )}
        </div>

        <div className="relative">
          <label className="text-sm text-zinc-500 mb-1 block">
            Current password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true, minLength: 6 })}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
          {errors.password && (
            <p className="text-xs text-red-500">Password required</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-sm font-semibold rounded-md bg-black text-white dark:bg-white dark:text-black disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Username"}
        </button>
      </form>
    </div>
  );
}
