// src/pages/EditTrip.tsx
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
          description: trip.description || "",
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
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 h-12 flex items-center px-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 active:opacity-60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="flex-1 text-center text-sm font-semibold">Edit trip</h1>

        <button
          onClick={submit}
          disabled={saving}
          className="text-sm font-semibold text-sky-500 disabled:opacity-40"
        >
          Save
        </button>
      </header>

      {/* CONTENT */}
      <main className="max-w-sm mx-auto px-4 pt-10 pb-28 space-y-10">
        {/* TITLE */}
        <div className="space-y-2">
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Trip title"
            className="
              w-full text-2xl font-semibold bg-transparent
              placeholder:text-zinc-400
              outline-none
            "
          />
          <p className="text-sm text-zinc-500">Trip name</p>
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={2}
          placeholder="What is this trip about?"
          className="
            w-full bg-transparent text-sm
            placeholder:text-zinc-400
            resize-none outline-none
          "
        />

        {/* DATES */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
            <label className="block text-xs text-zinc-500 mb-1">Start</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3">
            <label className="block text-xs text-zinc-500 mb-1">End</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={onChange}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>
      </main>

      {/* BOTTOM CTA (mobile confidence) */}
      <div className="fixed bottom-0 inset-x-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur px-4 py-3">
        <button
          onClick={submit}
          disabled={saving}
          className="w-full h-11 rounded-md bg-sky-500 text-white font-semibold text-sm disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default EditTrip;
