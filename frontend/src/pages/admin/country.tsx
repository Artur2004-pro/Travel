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
  EditButton,
  DeleteButton,
  ImageSection,
} from "../components";
import type { IResponse, ICountry, IShowMessage, IAccount } from "../../types";

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

  // Fetch countries
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

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;
  if (!account || account.role != "admin") {
    return <EmptyState title="Not access" subtitle="You not admin" icon="❌" />;
  }
  return (
    <div className="space-y-10 animate-fade-in">
      {message && <MessagePopup {...message} />}

      <AdminCard title="Countries" icon="🌍">
        <div className="flex items-center justify-between mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search country..."
          />
          <AddButton
            onClick={() => navigate("/admin/add-country")}
            label="Add Country"
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No countries found"
            subtitle="Try adding a new one using the 'Add Country' button."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((country) => (
              <CountryCard
                key={country._id}
                country={country}
                onEdit={() => navigate(`/admin/country/${country._id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  );
}

interface CountryCardProps {
  country: ICountry;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

function CountryCard({ country, onEdit, onDelete }: CountryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Cover */}
      <div className="relative">
        {country.images?.length ? (
          <ImageSection images={country.images} />
        ) : (
          <div className="h-40 bg-gradient-to-br from-sky-200/40 to-teal-200/30 dark:from-slate-800 dark:to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h3 className="absolute bottom-3 left-4 text-xl font-semibold text-white drop-shadow-md">
          {country.name}
        </h3>
      </div>

      {/* Description */}
      <div className="p-4 space-y-3">
        <p className="text-sm line-clamp-2 text-zinc-600 dark:text-zinc-400">
          {country.description || "No description provided."}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-3">
          <EditButton onClick={onEdit} />
          <DeleteButton id={country._id} onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
