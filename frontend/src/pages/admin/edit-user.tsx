import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup, BackButton } from "../components";
import type { IAccount, IResponse, IShowMessage } from "../../types";
import { useForm } from "react-hook-form";
import { UserCircle2 } from "lucide-react";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<IAccount | null>(null);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, watch } = useForm<IAccount>();

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const { data } = await Axios.get<IResponse<IAccount>>(
        `/account/user/${id}`
      );
      setUser(data.payload);
      reset(data.payload);
    } catch {
      setMessage({ type: "error", text: "Failed to load user data" });
    } finally {
      setLoading(false);
    }
  };

  const roleValue = watch("role");
  const canSave = useMemo(
    () => user && roleValue !== user.role,
    [roleValue, user]
  );

  const onSubmit = async (data: IAccount) => {
    if (!canSave) return;
    try {
      await Axios.patch(`/user/${id}`, { role: data.role });
      setMessage({ type: "success", text: "User updated" });
      setTimeout(() => navigate("/admin/users"), 800);
    } catch {
      setMessage({ type: "error", text: "Failed to update user" });
    }
  };

  if (loading || !user) return <Loader />;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {message && <MessagePopup {...message} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Edit user</h1>
        <BackButton to="/admin/users" />
      </div>

      {/* Profile preview */}
      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
            <UserCircle2 className="h-7 w-7 text-zinc-400" />
          </div>
        )}

        <div className="min-w-0">
          <div className="font-semibold truncate">{user.username}</div>
          <div className="text-sm text-zinc-500 truncate">{user.email}</div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-5"
      >
        {/* Role */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Role
          </label>
          <select
            {...register("role")}
            className="
              w-full
              rounded-xl
              border border-zinc-200 dark:border-zinc-800
              bg-white dark:bg-black
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-zinc-300 dark:focus:ring-zinc-700
            "
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Save */}
        <button
          disabled={!canSave}
          className={`
            w-full
            rounded-xl
            py-2.5
            text-sm
            font-semibold
            transition
            ${
              canSave
                ? "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }
          `}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
