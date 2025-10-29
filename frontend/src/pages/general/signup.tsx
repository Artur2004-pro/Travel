import { useForm } from "react-hook-form";
import type { INewUser } from "../../types";
import { Axios } from "../../lib/axios-config";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewUser>();

  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const showMessage = (msg: string, error = false) => {
    setIsError(error);
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  const submit = async (data: INewUser) => {
    try {
      setLoading(true);
      setEmail(data.email);
      setPassword(data.password);
      const response = await Axios.post("auth/signup", data);
      reset();
      showMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(
          error.response?.data?.message || "Something went wrong",
          true
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerify = async () => {
    if (!email || !password) {
      showMessage("Please enter your email and password above first", true);
      return;
    }
    try {
      setLoading(true);
      const response = await Axios.post("auth/resend-verification", {
        email,
        password,
      });
      showMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(
          error.response?.data?.message || "Something went wrong",
          true
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 px-4">
      <form
        onSubmit={handleSubmit(submit)}
        className="relative bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Create Account
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

        {/* Email */}
        <div className="mb-4">
          <label className="block text-slate-200 mb-1">Email</label>
          <input
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-all ${
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            } bg-slate-900 text-slate-100`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-slate-200 mb-1">Username</label>
          <input
            {...register("username", { required: "Username required" })}
            type="text"
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
              required: "Password required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
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

        {/* Signup Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-blue-400/30 disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Sign up"}
        </button>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>

        {/* Resend link */}
        <p className="text-center text-slate-400 text-xs mt-4">
          Didn’t get a verification email?{" "}
          <button
            type="button"
            onClick={handleResendVerify}
            className="text-blue-400 hover:underline font-medium"
            disabled={loading}
          >
            Resend verification
          </button>
        </p>
      </form>
    </div>
  );
};
