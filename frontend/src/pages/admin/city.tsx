import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import {
  Loader,
  MessagePopup,
  SearchInput,
  AddButton,
  BackButton,
  EmptyState,
} from "../components";
import type { IResponse, ICity, IShowMessage, IAccount } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";
import { CityItem } from "./city-item";

export default function City() {
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
      showMessage("error", "Failed to search cities");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await Axios.delete(`city/${id}`);
      setCities((prev) => prev.filter((c) => c._id !== id));
      showMessage("success", "City deleted");
    } catch {
      showMessage("error", "Failed to delete city");
    }
  };

  if (loading) return <Loader />;

  if (!account || account.role !== "admin") {
    return (
      <EmptyState
        title="Not authorized"
        subtitle="Admin access only"
        icon="⛔"
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {message && <MessagePopup {...message} />}

      {/* Sticky header / controls */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 py-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search city"
            className="sm:max-w-xs"
          />

          <div className="flex gap-2">
            <AddButton
              label="Add City"
              onClick={() => navigate("/admin/city/add")}
            />
            <BackButton />
          </div>
        </div>
      </div>

      {/* Feed */}
      {cities.length === 0 ? (
        <EmptyState
          title="No cities found"
          subtitle="Add new cities to get started"
        />
      ) : (
        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
          "
        >
          {cities.map((city) => (
            <CityItem key={city._id} city={city} onDelete={handleDelete} />
          ))}
        </section>
      )}
    </div>
  );
}
