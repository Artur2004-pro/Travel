import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import {
  AdminCard,
  Loader,
  MessagePopup,
  EmptyState,
  SearchInput,
} from "../components";
import type { IAccount, IResponse, IShowMessage } from "../../types";
import { UserItem } from "./user-item";
import { useOutletContext } from "react-router-dom";

export const Users = () => {
  const account = useOutletContext<IAccount>();
  const [users, setUsers] = useState<IAccount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<IShowMessage | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    if (!search.trim()) return;
    handleGetUsers();
  }, [search]);

  const handleGetUsers = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<IAccount[]>>(
        `account/user?search=${search}`
      );
      setUsers(data.payload);
    } catch {
      showMessage("error", "❌ Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) =>
    `${u.username} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (!account || account.role != "admin") {
    return (
      <EmptyState title="Not access" subtitle="You not a admin" icon="X" />
    );
  }
  return (
    <div>
      {message && <MessagePopup {...message} />}

      <AdminCard title="User Management" icon="👥">
        {/* 🔍 Search bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users..."
            className="w-full sm:max-w-sm"
          />
        </div>

        {/* 🚫 Empty or grid */}
        {filtered.length === 0 ? (
          <EmptyState
            title="No users found"
            subtitle="Try adjusting your search or add new users manually."
          />
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((user) => (
              <UserItem key={user._id} account={user} />
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
};
