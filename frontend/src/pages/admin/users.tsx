import { useOutletContext } from "react-router-dom";
import type { IOutletContext, IResponse, IUser } from "../../types";
import { EmptyState, Loader, MessagePopup } from "../components";
import { SearchInput } from "../components/search";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { UserItem } from "./user-item";

export const Users = () => {
  const { account } = useOutletContext<IOutletContext>();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");

  if (!account || account.role !== "admin") {
    return (
      <MessagePopup
        type="error"
        text="❌ Access Denied — You are not an admin."
      />
    );
  }

  useEffect(() => {
    const handler = setTimeout(() => handleSearch(), 400);
    return () => clearTimeout(handler);
  }, [searchText]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<IUser[]>>(
        `account/user?search=${searchText}`
      );
      setError(false);
      setUsers(data.payload);
    } catch {
      setError(true);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 flex items-center gap-2">
          👥 Users
        </h1>
        <div className="w-full sm:w-80">
          <SearchInput value={searchText} onChange={setSearchText} />
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      )}

      {/* Error / Empty */}
      {!loading && (error || users.length === 0) && (
        <EmptyState
          icon={error ? "😕" : "📭"}
          subtitle={error ? "No users found." : "No registered users yet."}
          title="Users"
        />
      )}

      {/* Responsive Grid */}
      {!loading && !error && users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};
