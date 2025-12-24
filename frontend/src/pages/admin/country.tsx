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
import type { IResponse, ICountry, IShowMessage, IAccount } from "../../types";
import { CountryItem } from "./country-item";

export default function Country() {
  const account = useOutletContext<IAccount>();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const navigate = useNavigate();

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    handleGetCountries();
  }, []);

  const handleGetCountries = async () => {
    try {
      const { data } = await Axios.get<IResponse<ICountry[]>>("country");
      setCountries(data.payload);
    } catch {
      showMessage("error", "❌ Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await Axios.delete(`country/${id}`);
      setCountries((prev) => prev.filter((c) => c._id !== id));
      showMessage("success", "✅ Country deleted");
    } catch {
      showMessage("error", "❌ Failed to delete");
    }
  };

  if (loading) return <Loader />;
  if (!account || account.role !== "admin")
    return (
      <div className="p-10 text-center text-zinc-500">❌ Not authorized</div>
    );

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6 px-4 sm:px-6 md:px-8">
      {message && <MessagePopup {...message} />}

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search country..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <AddButton
            onClick={() => navigate("/admin/add-country")}
            label="Add Country"
          />
          <BackButton />
        </div>
      </div>

      {/* Country Feed */}
      {filtered.length === 0 ? (
        <div className="text-center text-zinc-500 mt-10">
          No countries found. Add new countries to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((country) => (
            <CountryItem
              key={country._id}
              country={country}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
