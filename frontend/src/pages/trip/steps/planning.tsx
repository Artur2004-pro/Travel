// src/pages/Planning.tsx
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import type { ITripItem } from "../../../types";
import { ChevronLeft } from "lucide-react";

export const Planning: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setTripData, setCompleted } = useOutletContext<{
    tripData: any;
    setTripData(d: Partial<any>): void;
    setCompleted(p: Partial<ITripItem>): void;
  }>();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.title) return "Trip title is required";
    if (!form.startDate || !form.endDate) return "Select travel dates";
    if (new Date(form.startDate) > new Date(form.endDate))
      return "Start date cannot be after end date";
    return null;
  };

  const submit = async () => {
    const err = validate();
    if (err) return setError(err);
    if (!tripData?.countryId) return setError("Country must be selected first");

    try {
      setLoading(true);
      setError(null);

      const { data } = await Axios.post("/trip", {
        ...form,
        countryId: tripData.countryId,
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
      setError("Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <div className="h-12 px-3 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft />
          </button>
          <h1 className="flex-1 text-center text-sm font-semibold">New trip</h1>
          <button
            onClick={submit}
            disabled={loading}
            className="text-sm font-semibold text-sky-500 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs text-zinc-500">Trip title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Summer in Italy"
            className="w-full h-10 px-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm outline-none focus:border-zinc-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs text-zinc-500">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={3}
            placeholder="Optional"
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

      {/* MOBILE BOTTOM CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 dark:bg-black/90 backdrop-blur border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <button
          onClick={submit}
          disabled={loading}
          className="w-full h-11 rounded-md bg-sky-500 text-white font-semibold text-sm disabled:opacity-40"
        >
          {loading ? "Creating..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Planning;
