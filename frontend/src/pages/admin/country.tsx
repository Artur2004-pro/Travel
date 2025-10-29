import type { ICountry, IOutletContext, IResponse } from "../../types";
import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import { CountryItem } from "./country-item";
import { BackButton, EmptyState } from "../components/";
import { SearchInput } from "../components/search";
import { useNavigate, useOutletContext } from "react-router-dom";

export const Country = () => {
  const { account } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();
  if (!account || account.role != "admin") {
    return navigate("/login"), null;
  }
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim()) handleSearch(searchText);
      else setCountries([]);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchText]);

  const handleDelete = (id: string) => {
    setCountries((prev) => prev.filter((c) => c._id !== id));
  };

  const handleSearch = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await Axios.get<IResponse<{ countries: ICountry[] }>>(
        `country/search?name=${name}`
      );
      setCountries(data.payload.countries || []);
    } catch (error: any) {
      console.error(error);
      setError("❌ Error searching countries. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (!account || account.role !== "admin")
    return (
      <EmptyState
        title="⛔ Access Denied"
        subtitle="Only admins can access this page"
      />
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center px-4 sm:px-6 md:px-12 py-12">
      <div className="w-full max-w-7xl">
        {/* 🏷️ Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 flex items-center justify-center gap-2">
            🌍 <span className="text-indigo-700">Manage Countries</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mt-3">
            Search, edit or delete countries below.
          </p>
        </div>

        {/* 🔍 Search */}
        <div className="max-w-md mx-auto mb-16">
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            placeholder="Search country..."
          />
        </div>

        {/* 📦 Content */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 font-semibold mt-10">
            {error}
          </p>
        ) : countries.length > 0 ? (
          <div
            className="
              grid gap-10
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
              justify-items-center
              px-2 sm:px-0
            "
          >
            {countries.map((country) => (
              <CountryItem
                key={country._id}
                country={country}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 text-center">
            {searchText.trim() ? (
              <>
                <p className="text-2xl font-semibold">No results 😔</p>
                <p className="text-sm text-gray-400 mt-2">
                  Try searching for a different name.
                </p>
              </>
            ) : (
              <p className="text-lg">
                🔍 Start typing to search for a country...
              </p>
            )}
          </div>
        )}
      </div>

      <BackButton />
    </div>
  );
};
