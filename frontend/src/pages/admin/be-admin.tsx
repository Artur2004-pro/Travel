import { useForm } from "react-hook-form";
import { Axios } from "../../lib/axios-config";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const BeAdmin = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ adminToken: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const showMessage = (msg: string, error = false) => {
    setIsError(error);
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };
  const redirect = (path: string) => {
    setTimeout(() => {
      navigate("/" + path);
    }, 2000);
  };
  const submit = async (data: { adminToken: string }) => {
    try {
      setLoading(true);
      const response = await Axios.post("admin/be-admin", data);
      showMessage(response.data.message || "You are now an admin!");
      reset();
      redirect("admin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(
          error.response?.data?.message || "Invalid or expired admin token",
          true
        );
      } else {
        showMessage("Something went wrong", true);
      }
      redirect("home");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          🔒 Enter Admin Token
        </h2>

        {/* ✅ Animate message */}
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

        {/* Token input */}
        <div className="mb-6">
          <label className="block text-slate-200 mb-1">Admin Token</label>
          <input
            {...register("adminToken", { required: "Please enter token" })}
            type="password"
            placeholder="••••••••••"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-all ${
              errors.adminToken
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            } bg-slate-900 text-slate-100`}
          />
          {errors.adminToken && (
            <p className="text-red-400 text-sm mt-1">
              {errors.adminToken.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all shadow-md hover:shadow-blue-400/30 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
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
          {loading ? "Verifying..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
