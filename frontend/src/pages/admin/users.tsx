import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { Loader, EmptyState, SearchInput } from "../components";
import type { IAccount, IResponse } from "../../types";
import { UserItem } from "./user-item";
import { useOutletContext } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

export default function Users() {
  const account = useOutletContext<IAccount>();
  const [users, setUsers] = useState<IAccount[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setUsers([]);
      return;
    }
    fetchUsers();
  }, [debouncedSearch]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const isDev = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') || import.meta.env?.DEV;
      if (isDev) {
        const mock = { status: 'ok', message: '', payload: [] as IAccount[] };
        setUsers(mock.payload);
      } else {
        const { data } = await Axios.get<IResponse<IAccount[]>>(
          `account/user?search=${debouncedSearch}`
        );
        setUsers(data.payload);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  if (!account || account.role !== "admin") {
    return (
      <EmptyState title="No access" subtitle="Admin only section" icon="⛔" />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Sticky Search */}
      <div className="sticky top-0 z-10 w-full max-w-md bg-white/90 dark:bg-black/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-full p-2 flex justify-center mx-auto">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search users by username or email"
          className="w-full"
        />
      </div>

      {/* Content */}
      {loading ? (
        <Loader />
      ) : users.length === 0 ? (
          <EmptyState
            title={search ? "No users found" : "Start typing to search users"}
            subtitle={
              search
                ? "Try a different username or email"
                : "Search users by username or email"
            }
          />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full justify-center">
          {users.map((user) => (
            <UserItem key={user._id} account={user} />
          ))}
        </div>
      )}
    </div>
  );
}
