import { useForm } from "react-hook-form";
import type { ILoginResponse, ILoginUser } from "../../types";
import { Axios } from "../../lib/axios-config";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILoginUser>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const submit = async (data: ILoginUser) => {
    try {
      setLoading(true);
      const response = await Axios.post<ILoginResponse>("auth/login", {
        ...data,
      });
      localStorage.setItem("Authorization", response.data.token);
      reset();
      setIsError(false);
      setMessage(response.data.message || "Login successful!");
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsError(true);
        setMessage(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <form
        onSubmit={handleSubmit(submit)}
        className="relative bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Welcome Back
        </h2>

        {/* ✅ Animate feedback message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-lg text-sm text-center ${
                isError
                  ? "bg-red-500/20 border border-red-400 text-red-300"
                  : "bg-green-500/20 border border-green-400 text-green-300"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Username or Email */}
        <div className="mb-4">
          <label className="block text-slate-200 mb-1">Username or Email</label>
          <input
            {...register("username", {
              required: "Please enter your username or email",
            })}
            type="text"
            placeholder="john | johndoe@example.com"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-all ${
              errors.username
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            } bg-slate-900 text-slate-100`}
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-slate-200 mb-1">Password</label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            type="password"
            placeholder="••••••••"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-all ${
              errors.password
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            } bg-slate-900 text-slate-100`}
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-blue-400/30 disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};
