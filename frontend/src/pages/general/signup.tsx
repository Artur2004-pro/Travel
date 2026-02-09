import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup } from "../components";
import { Eye, EyeOff } from "lucide-react";
import type { ILoginResponse, IResponse } from "../../types";
import axios from "axios";
import { useAuth } from "../../context/auth-context";

type FormValues = {
  username: string;
  email: string;
  password: string;
  code?: string;
};

const inputClass =
  "w-full h-10 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const resendVerification = async () => {
    try {
      const data = watch();
      await Axios.post<IResponse>("/auth/resend-verification", data);
      setCode(true);
      setMessage({ type: "success", text: "Verification code resent" });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setMessage({
          type: "error",
          text: err.response?.data.message || "Failed to resend code",
        });
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      if (!data.code) {
        const res = await Axios.post("auth/signup", data);
        setMessage({
          type: "success",
          text: res.data.message || "Account created",
        });
        setCode(true);
      } else {
        const res = await Axios.post<ILoginResponse>("auth/verify-signup", data);
        login(res.data.payload);
        navigate("/");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setMessage({
        type: "error",
        text: axiosErr?.response?.data?.message || "Signup failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12 min-h-[80vh]">
      <div className="w-full max-w-[350px]">
        {loading && <Loader />}
        {message && <MessagePopup {...message} />}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 px-8 py-10"
        >
          <h1 className="text-3xl font-semibold text-center mb-2">Bardiner</h1>
          <p className="text-center text-sm text-neutral-500 mb-6">Sign up to see trips and plans</p>

          <div className="space-y-3">
            <input
              {...register("username", { required: true })}
              placeholder="Username"
              className={inputClass}
            />
            {errors.username && (
              <p className="text-xs text-red-500">Username is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-xs text-red-500">Email is required</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {code && (
              <input
                {...register("code")}
                placeholder="Verification code"
                className={inputClass}
              />
            )}
          </div>

          {code && (
            <button
              type="button"
              onClick={resendVerification}
              className="mt-4 text-xs text-neutral-600 dark:text-neutral-400 hover:underline"
            >
              Resend verification code
            </button>
          )}

          <button
            type="submit"
            className="mt-6 w-full h-10 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {code ? "Verify" : "Sign up"}
          </button>

          <p className="mt-6 text-center text-xs text-neutral-400">
            By signing up, you agree to our Terms and Privacy Policy.
          </p>
        </form>

        <div className="mt-4 border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 text-center text-sm bg-white dark:bg-neutral-950">
          Have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-neutral-900 dark:text-white hover:underline cursor-pointer"
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}
