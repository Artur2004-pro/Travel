import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import type {
  IAccount,
  IOutletContext,
  IResponse,
  IShowMessage,
} from "../../types";
import { EmptyState, Loader, MessagePopup } from "../components";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import axios from "axios";

export const EditUser = () => {
  const { id } = useParams();
  const { account } = useOutletContext<IOutletContext>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [user, setUser] = useState<IAccount | null>(null);
  const navigate = useNavigate();

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };
  if (!account || account.role !== "admin") {
    return (
      <EmptyState
        title="User"
        subtitle="Access Denied — You are not an admin."
        icon="❌"
      />
    );
  }
  if (!id) {
    navigate(-1);
    return null;
  }

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<IAccount>>(
        `account/user/${id}`
      );
      setUser(data.payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.request.data;
        showMessage("error", message || "Error");
      } else {
        showMessage("error", "Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async () => {
    if (!user) return;
    try {
      const newRole = user.role === "admin" ? "user" : "admin";
      const { data } = await Axios.patch<IResponse<"user" | "admin">>(
        `account/role/${user._id}`,
        { role: newRole }
      );
      setUser({ ...user, role: data.payload });
      showMessage("success", data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data;
        showMessage("error", message);
      } else {
        showMessage("error", "Error");
      }
    }
  };

  const toggleBlock = async () => {
    if (!user) return;
    try {
      const { data } = await Axios.patch<IResponse<boolean>>(
        `account/configure/${user._id}`,
        { isBlocked: !user.isBlocked }
      );
      setUser({ ...user, isBlocked: data.payload });
      showMessage("success", data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data;
        showMessage("error", message || "Error");
      } else {
        showMessage("error", "Error");
      }
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-zinc-100 rounded-2xl p-6 shadow-md border border-gray-200 text-gray-800">
      {message && <MessagePopup type={message.type} text={message.text} />}
      {loading && <Loader />}

      <div className="flex flex-col items-center gap-4">
        <img
          src={user.avatar || "/default.jpg"}
          alt={user.username}
          className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
        />
        <h2 className="text-xl font-semibold">{user.username}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>

        <div className="flex flex-col gap-2 mt-4 w-full">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Email status:</span>
            <span
              className={`text-sm font-medium ${
                user.emailVerified ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {user.emailVerified ? "Verified" : "Not verified"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Role:</span>
            <span
              className={`text-sm px-2 py-0.5 rounded-full ${
                user.role === "admin"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-sky-100 text-sky-700"
              }`}
            >
              {user.role}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Status:</span>
            <span
              className={`text-sm ${
                user.isBlocked ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {user.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Registered at:</span>
            <span className="text-gray-700 text-sm">
              {new Date(user.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6 w-full">
          <button
            onClick={toggleAdmin}
            className={`flex-1 rounded-lg py-2 font-medium transition-colors ${
              user.role === "admin"
                ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                : "bg-sky-100 hover:bg-sky-200 text-sky-700"
            }`}
          >
            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
          </button>

          <button
            onClick={toggleBlock}
            className={`flex-1 rounded-lg py-2 font-medium transition-colors ${
              user.isBlocked
                ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-700"
                : "bg-rose-100 hover:bg-rose-200 text-rose-700"
            }`}
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
        ></button>
      </div>
    </div>
  );
};
