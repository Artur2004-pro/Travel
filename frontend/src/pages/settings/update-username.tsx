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

export const UpdateUsername = () => {
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
  const [show, setShow] = useState(false);

  const showMessage = (type: "success" | "error", text: string) => {
    setPopup({ type, text });
    setTimeout(() => setPopup(null), 2500);
  };

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      const { data } = await Axios.post<IResponse>(
        "account/update-username",
        values
      );
      showMessage("success", (data as any).message || "Username updated");
      reset();
    } catch (err: any) {
      showMessage("error", err?.response?.data?.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gradient-to-br from-pink-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="w-full max-w-lg rounded-3xl p-8 bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-white/10 shadow-xl animate-fade-in space-y-8">
        {popup && <MessagePopup {...popup} />}

        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
          Update Username
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-zinc-900 dark:text-white">
              New Username
            </label>
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 rounded-xl border border-white/20 dark:border-slate-700 bg-white/20 dark:bg-slate-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:ring-sky-400 transition"
              placeholder="Enter new username"
            />
          </div>

          {/* Password */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-zinc-900 dark:text-white">
              Password
            </label>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                })}
                className="w-full px-3 py-2 pr-11 rounded-xl border border-white/20 dark:border-slate-700 bg-white/20 dark:bg-slate-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gradient-to-r focus:ring-teal-400 transition"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="text-xs text-zinc-500">Minimum 6 characters</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-emerald-400 to-sky-400 text-white hover:brightness-110 transition shadow-md ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsername;
