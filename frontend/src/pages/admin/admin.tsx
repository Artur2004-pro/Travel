import { useEffect, useState } from "react";
import { Globe2, MapPin, Users, ShieldCheck } from "lucide-react";
import { Axios } from "../../lib/axios-config";
import { AdminCard, EmptyState, Loader, MessagePopup } from "../components";
import type { IAccount, IResponse, IShowMessage, IStats } from "../../types";
import { useOutletContext } from "react-router-dom";

export default function Admin() {
  const account = useOutletContext<IAccount>();

  const [stats, setStats] = useState<IStats>({
    countries: 0,
    cities: 0,
    users: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<IShowMessage | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get<IResponse<IStats>>("admin/stats");
        setStats(data.payload);
      } catch {
        showMessage("error", "Failed to load admin statistics");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;

  if (!account || account.role !== "admin") {
    return (
      <EmptyState
        title="Access denied"
        subtitle="Admin only section"
        icon="⛔"
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {message && <MessagePopup {...message} />}

      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Quick overview of the platform
        </p>
      </header>

      {/* Stats grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatTile label="Countries" value={stats.countries} icon={<Globe2 />} />
        <StatTile label="Cities" value={stats.cities} icon={<MapPin />} />
        <StatTile label="Users" value={stats.users} icon={<Users />} />
        <StatTile label="Admins" value={stats.admins} icon={<ShieldCheck />} />
      </section>

      {/* Feed-like cards */}
      <section className="space-y-6">
        <AdminCard title="Recent activity">
          <EmptyState
            title="No activity yet"
            subtitle="Create content or manage users to see activity."
          />
        </AdminCard>

        <AdminCard title="System status">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            All services are running normally.
          </div>
        </AdminCard>
      </section>
    </div>
  );
}

/* ---------------------------------- */

interface StatTileProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function StatTile({ label, value, icon }: StatTileProps) {
  return (
    <div
      className="
        group
        flex items-center justify-between
        rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-black
        px-4 py-4
        transition
        hover:bg-zinc-50 dark:hover:bg-zinc-900
      "
    >
      <div className="space-y-0.5">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="text-xl font-semibold">{value}</span>
      </div>

      <div
        className="
          h-10 w-10
          rounded-full
          flex items-center justify-center
          bg-zinc-100 dark:bg-zinc-900
          text-zinc-500 dark:text-zinc-400
          group-hover:scale-105
          transition
        "
      >
        {icon}
      </div>
    </div>
  );
}
