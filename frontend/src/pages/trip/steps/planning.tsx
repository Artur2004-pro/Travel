// src/pages/Planning.tsx
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { useAuth } from "../../../context/auth-context";
import type { ITripItem } from "../../../types";
import { ChevronLeft, Lock, Globe } from "lucide-react";

export const Planning: React.FC = () => {
  const navigate = useNavigate();
  const { account } = useAuth();
  const { tripData, setTripData, setCompleted } = useOutletContext<{
    tripData: { countryId?: string; tripId?: string };
    setTripData(d: Partial<{ tripId: string; startDate: string; endDate: string }>): void;
    setCompleted(p: Partial<ITripItem>): void;
  }>();

  const defaultPrivate = account?.defaultTripVisibility === "private";
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isPrivate: defaultPrivate,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.title) return "Give your trip a name";
    if (!form.startDate || !form.endDate) return "Select your travel dates";
    if (new Date(form.startDate) > new Date(form.endDate))
      return "Dates don’t make sense";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) return setError(err);
    if (!tripData?.countryId) return setError("Select country first");

    try {
      setLoading(true);
      setError(null);

      const { data } = await Axios.post("/trip", {
        ...form,
        countryId: tripData.countryId,
        isPrivate: form.isPrivate,
      });

      if (!data?.payload?._id) throw new Error();

      setTripData({
        tripId: data.payload._id,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      setCompleted({ planning: true });
      navigate("/trips/new/day-planning");
    } catch {
      setError("Could not create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 h-12 flex items-center px-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 active:opacity-60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="flex-1 text-center text-sm font-semibold">New trip</h1>

        <button
          onClick={submit}
          disabled={loading}
          className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 disabled:opacity-40"
        >
          Next
        </button>
      </header>

      {/* CONTENT */}
      <main className="max-w-sm mx-auto px-4 pt-10 pb-28 space-y-10">
        {/* HERO TITLE */}
        <div className="space-y-2">
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Summer in Italy"
            className="
              w-full text-2xl font-semibold bg-transparent
              placeholder:text-zinc-400
              outline-none
            "
          />
          <p className="text-sm text-zinc-500">Name your trip</p>
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

        {/* VISIBILITY */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <span className="text-sm font-medium">Visibility</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, isPrivate: false }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                !form.isPrivate ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800"
              }`}
            >
              <Globe size={14} strokeWidth={2} /> Public
            </button>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, isPrivate: true }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                form.isPrivate ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800"
              }`}
            >
              <Lock size={14} strokeWidth={2} /> Private
            </button>
          </div>
        </div>

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

        {error && <p className="text-sm text-red-500">{error}</p>}
      </main>

      {/* BOTTOM CTA */}
      <div className="fixed bottom-0 inset-x-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur px-4 py-3">
        <button
          onClick={submit}
          disabled={loading}
          className="w-full h-11 rounded-md bg-sky-500 text-white font-semibold text-sm disabled:opacity-40"
        >
          {loading ? "Creating…" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Planning;
