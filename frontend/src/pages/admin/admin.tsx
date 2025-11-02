import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import type { IResponse, IAccount } from "../../types";
import { Loader, MessagePopup, BackButton, AddButton } from "../components";

export const Admin = () => {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchAccount();
    test()
  }, []);
  const test = async () => {
    await Axios.patch("posts/x");
  };
  const fetchAccount = async () => {
    try {
      const { data } = await Axios.get<IResponse<{ user: IAccount }>>(
        "account"
      );
      setAccount(data.payload.user);
    } catch {
      setAccount(null);
      setMessage({ type: "error", text: "❌ Failed to load account info." });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-2">
      {message && <MessagePopup {...message} />}

      <div className="max-w-8xl mx-auto bg-white shadow-2xl rounded-2xl p-2 border border-gray-100">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          ⚙️ Admin Panel
        </h2>

        {account && account.role === "admin" ? (
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <AddButton label="Add New Country" path="add-country" />
            <AddButton label="Manage Countries" path="country" />
            <AddButton label="Manage Users" path="users"></AddButton>
          </div>
        ) : (
          <div className="text-center text-red-600 font-medium text-lg">
            ❌ Access Denied — You are not an admin.
          </div>
        )}

        <div className="border-t border-gray-200 mt-8 pt-8">
          <Outlet context={{ account }} />
        </div>
      </div>

      <BackButton />
    </div>
  );
};
