import { useEffect, useState } from "react";
import { Globe2, MapPin, Users, ShieldCheck } from "lucide-react";
import { Axios } from "../../lib/axios-config";
import { AdminCard, EmptyState, Loader, MessagePopup } from "../components";
import type { IAccount, IResponse, IShowMessage, IStats } from "../../types";
import { useOutletContext } from "react-router-dom";

export const Admin = () => {
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
  if (!account || account.role !== "admin") {
    return (
      <EmptyState title="No Access" subtitle="You are not admin" icon="❌" />
    );
  }

  return (
    <div className="space-y-8 animate-fade-in p-4 sm:p-6">
      {message && <MessagePopup {...message} />}

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-teal-400">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Overview of platform activity and data
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Countries"
          value={stats.countries}
          icon={<Globe2 className="h-6 w-6 text-pink-500" />}
          gradient="from-pink-200/40 to-pink-100/10"
        />
        <StatCard
          title="Cities"
          value={stats.cities}
          icon={<MapPin className="h-6 w-6 text-teal-500" />}
          gradient="from-teal-200/40 to-teal-100/10"
        />
        <StatCard
          title="Users"
          value={stats.users}
          icon={<Users className="h-6 w-6 text-purple-500" />}
          gradient="from-purple-200/40 to-purple-100/10"
        />
        <StatCard
          title="Admins"
          value={stats.admins}
          icon={<ShieldCheck className="h-6 w-6 text-indigo-500" />}
          gradient="from-indigo-200/40 to-indigo-100/10"
        />
      </div>

      {/* Recent Updates */}
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
      className={`relative p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md bg-gradient-to-br ${gradient}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold mt-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-teal-400">
            {value}
          </h3>
        </div>
        <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Admin;
