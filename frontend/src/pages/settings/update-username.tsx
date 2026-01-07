import { useForm } from "react-hook-form";
import { useState } from "react";
import { Axios } from "../../lib/axios-config";
import { MessagePopup } from "../components";
import { Eye, EyeOff } from "lucide-react";
import type { IResponse } from "../../types";

type FormValues = {
  username: string;
  password: string;
};

export default function UpdateUsername() {
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

  return (
    <div className="mx-auto w-full max-w-[470px] px-4 py-6">
      {popup && <MessagePopup {...popup} />}

      <h1 className="text-lg font-semibold mb-6">Change Username</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* New username */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-500">New username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="
              w-full rounded-md px-3 py-2
              border border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-black
              text-sm
              focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
            "
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-zinc-500">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
          <p className="text-xs text-zinc-500">
            Enter your current password to confirm changes.
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
          {loading ? "Saving..." : "Update Username"}
        </button>
      </form>
    </div>
  );
}
