import { useEffect, useState } from "react";
import { Globe2, MapPin, Users, ShieldCheck } from "lucide-react";
import { Axios } from "../../lib/axios-config";
import { AdminCard, EmptyState, Loader, MessagePopup } from "../components";
import type {
  IAccount,
  IOutletContext,
  IResponse,
  IShowMessage,
  IStats,
} from "../../types";
import { useOutletContext } from "react-router-dom";

export const Admin = () => {
  const account = useOutletContext<IAccount>();
  const [stats, setStats] = useState({
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
        setLoading(true);
        const { data } = await Axios.get<IResponse<IStats>>("admin/stats");
        setStats(data.payload);
      } catch {
        showMessage("error", "❌ Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader />;
  if (!account || account.role != "admin") {
    return <EmptyState title="Not access" subtitle="You not admin" icon="❌" />;
  }
  return (
    <div className="space-y-10 animate-fade-in">
      {message && <MessagePopup {...message} />}
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
          Admin Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
          Overview of platform activity and data
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Countries"
          value={stats.countries}
          icon={<Globe2 className="h-5 w-5 text-sky-500" />}
          gradient="from-sky-500/20 to-sky-500/5"
        />
        <StatCard
          title="Cities"
          value={stats.cities}
          icon={<MapPin className="h-5 w-5 text-emerald-500" />}
          gradient="from-emerald-500/20 to-emerald-500/5"
        />
        <StatCard
          title="Users"
          value={stats.users}
          icon={<Users className="h-5 w-5 text-teal-500" />}
          gradient="from-teal-500/20 to-teal-500/5"
        />
        <StatCard
          title="Admins"
          value={stats.admins}
          icon={<ShieldCheck className="h-5 w-5 text-indigo-500" />}
          gradient="from-indigo-500/20 to-indigo-500/5"
        />
      </div>

      {/* Data Preview */}
      <AdminCard title="Recent Updates" icon="🕓">
        <EmptyState
          title="No recent updates yet"
          subtitle="Add countries, cities or manage users to see data here."
        />
      </AdminCard>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({ title, value, icon, gradient }: StatCardProps) {
  return (
    <div
      className={`relative p-5 rounded-2xl border border-zinc-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-xl bg-gradient-to-br ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
            {value}
          </h3>
        </div>
        <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
}
