import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import {
  Loader,
  MessagePopup,
  SearchInput,
  AddButton,
  BackButton,
} from "../components";
import type { IResponse, ICity, IShowMessage, IAccount } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";
import { CityItem } from "./city-item";

export const City = () => {
  const account = useOutletContext<IAccount>();
  const [cities, setCities] = useState<ICity[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const navigate = useNavigate();

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    if (debouncedSearch.trim()) handleSearch(debouncedSearch);
    else handleGetAllCities();
  }, [debouncedSearch]);

  const handleGetAllCities = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<ICity[]>>("city/top");
      setCities(data.payload);
    } catch {
      showMessage("error", "Failed to load cities");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<ICity[]>>(
        `city/search?name=${query}`
      );
      setCities(data.payload);
    } catch {
      showMessage("error", "❌ Failed to search cities");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await Axios.delete(`city/${id}`);
      setCities((prev) => prev.filter((c) => c._id !== id));
      showMessage("success", "✅ City deleted");
    } catch {
      showMessage("error", "❌ Failed to delete");
    }
  };

  if (loading) return <Loader />;
  if (!account || account.role !== "admin")
    return (
      <div className="p-10 text-center text-zinc-500">❌ Not authorized</div>
    );

  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6 px-4 sm:px-6 md:px-8">
      {message && <MessagePopup {...message} />}

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search city..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <AddButton
            onClick={() => navigate(`/admin/city/add`)}
            label="Add City"
          />
          <BackButton />
        </div>
      </div>

      {/* City Feed */}
      {filtered.length === 0 ? (
        <div className="text-center text-zinc-500 mt-10">
          No cities found. Add new cities to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((city) => (
            <CityItem key={city._id} city={city} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default City;
