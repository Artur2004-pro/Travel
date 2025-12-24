import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";

const EditTrip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    Axios.get(`/trip/${id}`)
      .then(({ data }) => {
        const trip = data.payload;
        setForm({
          title: trip.title,
          description: trip.description,
          startDate: trip.startDate.slice(0, 10),
          endDate: trip.endDate.slice(0, 10),
        });
      })
      .catch(() => toast.error("Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    try {
      setSaving(true);
      await Axios.put(`/trip/${id}`, form);
      toast.success("Trip updated");
      navigate(-1);
    } catch {
      toast.error("Failed to update trip");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <div className="h-12 px-3 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft />
          </button>
          <h1 className="flex-1 text-center text-sm font-semibold">
            Edit trip
          </h1>
          <button
            onClick={submit}
            disabled={saving}
            className="text-sm font-semibold text-sky-500 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs text-zinc-500">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="w-full h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm outline-none focus:border-zinc-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs text-zinc-500">Description</label>
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={onChange}
            className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm resize-none outline-none focus:border-zinc-500"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-zinc-500">Start date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              className="w-full h-10 px-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-500">End date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={onChange}
              className="w-full h-10 px-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
