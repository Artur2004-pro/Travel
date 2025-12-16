import { useForm } from "react-hook-form";
import type { ILoginUser, ILoginResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useThem";
import axios from "axios";

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginUser>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dark } = useTheme();

  const submit = async (data: ILoginUser) => {
    try {
      setLoading(true);
      const response = await Axios.post<ILoginResponse>("auth/login", data);
      localStorage.setItem("Authorization", response.data.payload);
      reset();
      setIsError(false);
      setMessage("✅ Login successful!");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsError(true);
        setMessage(error.response?.data?.message || "❌ Login failed");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-app px-4">
      <form
        onSubmit={handleSubmit(submit)}
        className={`relative glass w-full max-w-md p-10 rounded-3xl border shadow-xl transition-all duration-500 ${
          dark
            ? "border-slate-800 shadow-blue-900/20"
            : "border-zinc-200 shadow-sky-100/50"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
          Welcome Back 👋
        </h2>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-lg text-sm text-center ${
                isError
                  ? "bg-rose-500/10 border border-rose-500 text-rose-500"
                  : "bg-emerald-500/10 border border-emerald-500 text-emerald-500"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Username */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
              Username or Email
            </label>
            <input
              {...register("username", { required: "Required" })}
              placeholder="john | johndoe@example.com"
              className="input"
            />
            {errors.username && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
              Password
            </label>
            <input
              {...register("password", { required: "Required" })}
              type="password"
              placeholder="••••••••"
              className="input"
            />
            {errors.password && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full btn-primary text-base py-2.5"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-5">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-sky-600 dark:text-teal-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
