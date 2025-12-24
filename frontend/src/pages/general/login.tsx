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
  const { dark } = useTheme();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (data: ILoginUser) => {
    try {
      setLoading(true);
      const response = await Axios.post<ILoginResponse>("auth/login", data);
      localStorage.setItem("Authorization", response.data.payload);
      reset();
      setIsError(false);
      setMessage("Login successful");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsError(true);
        setMessage(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <form
          onSubmit={handleSubmit(submit)}
          className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black rounded-lg px-8 py-10"
        >
          {/* Logo / Title */}
          <h1 className="text-3xl font-semibold text-center mb-8 tracking-tight">
            Bardiner
          </h1>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`mb-4 text-center text-sm ${
                  isError ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              {...register("username", { required: true })}
              placeholder="Phone number, username, or email"
              className="w-full h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm outline-none focus:border-zinc-500"
            />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm outline-none focus:border-zinc-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full h-9 rounded-md bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 disabled:opacity-50"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
          </div>

          {/* Extra */}
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Forgot your password?
          </p>
        </form>

        {/* Signup */}
        <div className="mt-3 border border-zinc-300 dark:border-zinc-700 rounded-lg py-4 text-center text-sm bg-white dark:bg-black">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-sky-500 hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
