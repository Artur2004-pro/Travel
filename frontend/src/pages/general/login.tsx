import { useForm } from "react-hook-form";
import type { ILoginUser, ILoginResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth-context";

export default function Login() {
  const { register, handleSubmit, reset } = useForm<ILoginUser>();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (data: ILoginUser) => {
    try {
      setLoading(true);
      const response = await Axios.post<ILoginResponse>("auth/login", data);
      login(response.data.payload);
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
    /* ⬇️ սա է ամբողջ մոգությունը */
    <div className="flex-1 flex justify-center px-6 pt-24">
      <div className="w-full max-w-sm">
        {/* Card */}
        <form
          onSubmit={handleSubmit(submit)}
          className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black rounded-xl px-10 py-8"
        >
          {/* Logo */}
          <h1 className="text-7xl font-semibold tracking-tight font-tangerine text-center mb-10">
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
              placeholder="Username, or email"
              className="w-full h-11 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm outline-none focus:border-black dark:focus:border-white"
            />

            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full h-11 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm outline-none focus:border-black dark:focus:border-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-10 rounded-md bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 disabled:opacity-40"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-xs text-zinc-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700" />
          </div>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Forgot your password?
          </p>
        </form>

        {/* Signup */}
        <div className="mt-4 border border-zinc-300 dark:border-zinc-700 rounded-xl py-4 text-center text-sm bg-white dark:bg-black">
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
}
