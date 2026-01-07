import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Axios } from "../../lib/axios-config";
import { CountryItem } from "./country-item";
import {
  Loader,
  MessagePopup,
  SearchInput,
  AddButton,
  BackButton,
  EmptyState,
} from "../components";
import type { IResponse, ICountry, IShowMessage, IAccount } from "../../types";

export default function Country() {
  const account = useOutletContext<IAccount>();
  const navigate = useNavigate();

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<IShowMessage | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    fetchCountries(1, true);
  }, []);

  const fetchCountries = async (pageNum: number, replace = false) => {
    try {
      const { data } = await Axios.get<IResponse<ICountry[]>>(
        `country?page=${pageNum}`
      );

      if (data.payload.length === 0) {
        setHasMore(false);
        return;
      }

      setCountries((prev) =>
        replace ? data.payload : [...prev, ...data.payload]
      );
    } catch {
      showMessage("error", "Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await Axios.delete(`country/${id}`);
      setCountries((prev) => prev.filter((c) => c._id !== id));
      showMessage("success", "Country deleted");
    } catch {
      showMessage("error", "Failed to delete country");
    }
  };

  // if (loading) return <Loader />;

  if (!account || account.role !== "admin") {
    return (
      <EmptyState
        title="Not authorized"
        subtitle="Admin access only"
        icon="⛔"
      />
    );
  }

  const filtered = search
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {message && <MessagePopup {...message} />}

      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 py-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search country"
            className="sm:max-w-xs"
          />

          <div className="flex gap-2">
            <AddButton
              label="Add Country"
              onClick={() => navigate("/admin/add-country")}
            />
            <BackButton />
          </div>
        </div>
      </div>

      {/* Feed */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No countries found"
          subtitle="Add new countries to get started"
        />
      ) : (
        <InfiniteScroll
          dataLength={countries.length}
          next={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchCountries(nextPage);
          }}
          hasMore={hasMore}
          loader={<Loader />}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
          "
        >
          {filtered.map((country) => (
            <CountryItem
              key={country._id}
              country={country}
              onDelete={handleDelete}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
