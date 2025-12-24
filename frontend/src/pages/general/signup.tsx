import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup } from "../components";
import { Eye, EyeOff } from "lucide-react";
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
        text: err?.response?.data?.message || "Signup failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full h-10 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-3 text-sm outline-none focus:border-zinc-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      {loading && <Loader />}
      {message && <MessagePopup {...message} />}

      <div className="w-full max-w-sm">
        {/* Card */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-black px-8 py-10"
        >
          <h1 className="text-3xl font-semibold text-center mb-6 tracking-tight">
            Bardiner
          </h1>

          <p className="text-center text-sm text-zinc-500 mb-6">
            Sign up to see trips and plans
          </p>

          <div className="space-y-3">
            <input
              {...register("username", { required: true })}
              placeholder="Full name"
              className={input}
            />
            {errors.username && (
              <p className="text-xs text-red-500">Full name is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
              className={input}
            />
            {errors.email && (
              <p className="text-xs text-red-500">Email is required</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Password"
                className={`${input} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {code && (
              <input
                {...register("code")}
                placeholder="Verification code"
                className={input}
              />
            )}
          </div>

          {code && (
            <button
              type="button"
              onClick={resendVerification}
              className="mt-4 text-xs text-sky-500 hover:underline"
            >
              Resend verification code
            </button>
          )}

          <button
            type="submit"
            className="mt-5 w-full h-9 rounded-md bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600"
          >
            {code ? "Verify" : "Sign up"}
          </button>

          <p className="mt-6 text-center text-xs text-zinc-500">
            By signing up, you agree to our Terms and Privacy Policy.
          </p>
        </form>

        {/* Footer */}
        <div className="mt-3 border border-zinc-300 dark:border-zinc-700 rounded-lg py-4 text-center text-sm">
          Have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-sky-500 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}
