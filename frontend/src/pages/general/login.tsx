import { useForm } from "react-hook-form";
import type { ILoginUser, ILoginResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="flex-1 flex items-center justify-center px-6 py-12 min-h-[80vh]">
      <div className="w-full max-w-[350px]">
        <form
          onSubmit={handleSubmit(submit)}
          className="border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-950 px-8 py-10"
        >
          <h1 className="text-3xl font-semibold text-center mb-8">Bardiner</h1>

          {message && (
            <p
              className={`mb-4 text-center text-sm ${
                isError ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {message}
            </p>
          )}

          <div className="space-y-3">
            <input
              {...register("username", { required: true })}
              placeholder="Username or email"
              className="w-full h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
            />

            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full h-10 px-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-10 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            <span className="text-xs text-neutral-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <p className="text-center text-xs text-neutral-500">Forgot password?</p>
        </form>

        <div className="mt-4 border border-neutral-200 dark:border-neutral-800 rounded-lg py-4 text-center text-sm bg-white dark:bg-neutral-950">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-neutral-900 dark:text-white hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
