import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup, BackButton } from "../components";
import type { IAccount, IResponse, IShowMessage } from "../../types";
import { useForm } from "react-hook-form";

export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<IAccount | null>(null);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<IAccount>();

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<IAccount>>(
        `/account/user/${id}`
      );
      setUser(data.payload);
      reset(data.payload);
    } catch {
      setMessage({ type: "error", text: "Failed to load user data." });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: IAccount) => {
    if (!canSave) return;
    try {
      await Axios.patch(`/user/${id}`, { role: data.role });
      setMessage({ type: "success", text: "User role updated successfully!" });
      setTimeout(() => navigate("/admin/users"), 1000);
    } catch {
      setMessage({ type: "error", text: "Failed to update user role." });
    }
  };

  const roleValue = watch("role");
  const canSave = useMemo(
    () => user && roleValue !== user.role,
    [roleValue, user]
  );

  if (loading || !user) return <Loader />;

  return (
    <div className="flex justify-center items-start py-16 px-4 min-h-[80vh] bg-gradient-to-br from-sky-50/80 via-white/90 to-teal-50/80 dark:from-[#050911] dark:via-[#070b14] dark:to-[#060a12] transition-colors">
      <div className="w-full max-w-xl bg-gradient-to-br from-white/90 to-white/70 dark:from-[#0b0f1a]/95 dark:to-[#0c101a]/90 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[2rem] shadow-[0_0_40px_-10px_rgba(16,185,129,0.25)] p-10 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]">
            Edit User ✏️
          </h1>
          <BackButton to="/admin/users" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
              Username
            </label>
            <input
              value={user.username}
              readOnly
              className="w-full p-3.5 rounded-xl bg-white/70 dark:bg-[#0f1624]/70 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 cursor-not-allowed shadow-inner"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
              Email
            </label>
            <input
              value={user.email}
              readOnly
              className="w-full p-3.5 rounded-xl bg-white/70 dark:bg-[#0f1624]/70 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 cursor-not-allowed shadow-inner"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
              Role
            </label>
            <select
              {...register("role")}
              defaultValue={user.role}
              className="w-full p-3.5 rounded-xl bg-white/80 dark:bg-[#0f1624]/70 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Save */}
          <button
            disabled={!canSave}
            className={`w-full py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 ${
              !canSave
                ? "bg-zinc-300/70 dark:bg-zinc-800/60 text-zinc-500 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] text-white"
            }`}
          >
            {canSave ? "Save Changes" : "No Changes"}
          </button>
        </form>

        {/* Popup */}
        {message && (
          <div className="mt-6">
            <MessagePopup type={message.type} text={message.text} />
          </div>
        )}
      </div>
    </div>
  );
};
