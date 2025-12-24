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
    <div className="flex justify-center items-start py-10 px-4 min-h-[80vh] bg-gradient-to-br from-sky-50 dark:from-[#050911] transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-[#0c101a] rounded-2xl shadow-lg p-6 relative flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400">
            Edit User ✏️
          </h1>
          <BackButton to="/admin/users" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-700 dark:text-zinc-300">
              Username
            </label>
            <input
              value={user.username}
              readOnly
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#0f1624] text-zinc-700 dark:text-zinc-300 cursor-not-allowed border border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              value={user.email}
              readOnly
              className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#0f1624] text-zinc-700 dark:text-zinc-300 cursor-not-allowed border border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-700 dark:text-zinc-300">
              Role
            </label>
            <select
              {...register("role")}
              defaultValue={user.role}
              className="w-full p-3 rounded-xl bg-white dark:bg-[#0f1624] text-zinc-900 dark:text-zinc-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-emerald-400 outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            disabled={!canSave}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              !canSave
                ? "bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 text-white hover:shadow-lg"
            }`}
          >
            {canSave ? "Save Changes" : "No Changes"}
          </button>
        </form>

        {message && <MessagePopup type={message.type} text={message.text} />}
      </div>
    </div>
  );
};

export default EditUser;
