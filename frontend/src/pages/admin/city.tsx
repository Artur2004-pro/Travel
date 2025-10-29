import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import type { ICity, IOutletContext, IResponse } from "../../types";
import {
  SearchInput,
  Loader,
  EmptyState,
  BackButton,
} from "../components/index.ts";
import { CityItem } from "./city-item";

export const City = () => {
  const { account } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();
  if (!account || account.role != "admin") {
    return navigate("/login"), null;
  }
  const { countryId } = useParams();
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchText.trim()) handleSearch(searchText);
      else fetchAllCities();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchText]);

  const fetchAllCities = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<ICity[]>>(`city/${countryId}`);
      setCities(data.payload);
      setError(null);
    } catch {
      setError("❌ Error fetching cities.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (name: string) => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<{ cities: ICity[] }>>(
        `city/search?name=${name}&country=${countryId}`
      );
      setCities(data.payload.cities);
    } catch {
      setError("❌ Error searching cities.");
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
    <div className="min-h-screen bg-gray-50 py-10 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🏙️ Manage Cities
        </h2>

        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder="Type a city name..."
        />

        {loading && <Loader />}
        {error && (
          <p className="text-center text-red-500 font-medium mt-10">{error}</p>
        )}

        {!loading && !error && cities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map((city) => (
              <CityItem key={city._id} city={city} />
            ))}
          </div>
        )}

        {!loading && !error && cities.length === 0 && (
          <EmptyState
            title="No cities found 😔"
            subtitle="Try searching for a different name."
            icon="🏙️"
          />
        )}
      </div>

      <BackButton />
    </div>
  );
};
