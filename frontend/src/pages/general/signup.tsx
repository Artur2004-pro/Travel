import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup } from "../components";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import type { ILoginResponse, IResponse } from "../../types";
import axios from "axios";

type FormValues = {
  username: string;
  email: string;
  password: string;
  code?: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [code, setCode] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const navigate = useNavigate();
  const resendVerification = async () => {
    try {
      const allFormData = watch();
      const { data } = await Axios.post<IResponse>(
        "/auth/resend-verification",
        allFormData
      );
      setCode(true);
      console.log(data);
    } catch (err) {
      if (axios.isAxiosError(err))
        setMessage({ type: "error", text: err.response?.data.message });
    }
  };
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      if (!data.code) {
        const res = await Axios.post("auth/signup", data);
        setMessage({
          type: "success",
          text: res.data.message || "Account created!",
        });
        setCode(true);
      } else {
        const res = await Axios.post<ILoginResponse>(
          "auth/verify-signup",
          data
        );
        localStorage.setItem("Authorization", res.data.payload);
        navigate("/");
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Signup failed.",
      });
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border px-3 py-2 text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent";

  return (
    <div className="min-h-screen flex items-center justify-center bg-app px-4 py-10">
      {loading && <Loader />}
      {message && <MessagePopup {...message} />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="glass w-full max-w-md rounded-3xl p-8 shadow-xl border border-zinc-200/50 dark:border-slate-800/40 animate-fade-in"
      >
        <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 mb-8">
          Create Your Bardiner Account
        </h1>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
            Full Name
          </label>
          <div className="relative flex items-center">
            <User className="absolute left-3 text-zinc-400 dark:text-zinc-500 h-5 w-5" />
            <input
              type="text"
              {...register("username", { required: "Full name is required" })}
              placeholder="e.g. Anna Martirosyan"
              className={`${inputBase} pl-10 ${
                errors.username
                  ? "border-destructive text-destructive placeholder-destructive"
                  : "border-zinc-300 dark:border-slate-700"
              }`}
            />
          </div>
          {errors.username && (
            <p className="text-xs text-destructive mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-zinc-400 dark:text-zinc-500 h-5 w-5" />
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@example.com"
              className={`${inputBase} pl-10 ${
                errors.email
                  ? "border-destructive text-destructive placeholder-destructive"
                  : "border-zinc-300 dark:border-slate-700"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
            Password
          </label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-zinc-400 dark:text-zinc-500 h-5 w-5" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="••••••••"
              className={`${inputBase} pl-10 ${
                errors.password
                  ? "border-destructive text-destructive placeholder-destructive"
                  : "border-zinc-300 dark:border-slate-700"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 text-zinc-400 dark:text-zinc-500 hover:text-sky-500 transition"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Verification Code */}
        {code && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
              Verification code
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-zinc-400 dark:text-zinc-500 h-5 w-5" />
              <input
                type="text"
                {...register("code")}
                placeholder="123456"
                className={`${inputBase} pl-10 border-zinc-300 dark:border-slate-700`}
              />
            </div>
          </div>
        )}
        {/* Submit */}
        <p onClick={resendVerification}>Resend Verification code?</p>
        <button type="submit" className="btn-primary w-full text-base">
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-sky-500 dark:text-teal-400 font-medium hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
