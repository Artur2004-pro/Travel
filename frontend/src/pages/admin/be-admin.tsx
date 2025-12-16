import { useState } from "react";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup, BackButton } from "../components";
import type { IShowMessage } from "../../types";

export const BeAdmin = () => {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<IShowMessage | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Axios.post("/be-admin", { email, reason });
      showMessage("success", data.message || "✅ Request sent successfully!");
      setEmail("");
      setReason("");
    } catch (err: any) {
      showMessage(
        "error",
        err?.response?.data?.message || "❌ Failed to send admin request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-app min-h-screen flex justify-center items-center py-10 px-4">
      {loading && <Loader />}
      {message && <MessagePopup {...message} />}

      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-md p-8 rounded-3xl shadow-xl space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
          Become an Admin ✨
        </h2>

        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mb-4">
          Submit a request to get admin access for managing platform data.
        </p>

        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Your Email
          </label>
          <input
            type="email"
            className="input mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Why do you need admin access?
          </label>
          <textarea
            className="input h-28 mt-1"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain briefly your reason..."
            required
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full justify-center mt-2"
        >
          Submit Request
        </button>

        <div className="flex justify-center mt-4">
          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default BeAdmin;
