import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import {
  AdminCard,
  EmptyState,
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
    if (debouncedSearch.trim()) {
      handleSearch(debouncedSearch);
    } else handleGetAllCities();
  }, [debouncedSearch]);
  const handleGetAllCities = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<ICity[]>>("city/top");
      setCities(data.payload);
    } catch (error) {
      showMessage("error", "Error");
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
      showMessage("error", "❌ Failed to load cities");
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

  const filtered = cities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (!account || account.role != "admin") {
    return (
      <EmptyState title="Not access" subtitle="You not a admin" icon="❌" />
    );
  }
  return (
    <div className="space-y-10 animate-fade-in">
      {message && <MessagePopup {...message} />}

      <AdminCard title="Cities" icon="🏙️">
        <div className="flex items-center justify-between mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search city..."
          />
          <div className="flex gap-3">
            <AddButton
              onClick={() => navigate(`/admin/city/add`)}
              label="Add City"
            />
            <BackButton />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No cities found"
            subtitle="Add new cities to this country to get started."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((city) => (
              <CityItem key={city._id} city={city} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
};

export default City;
