// src/pages/Planning.tsx
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import type { ITripItem } from "../../../types";

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

  const validateForm = () => {
    if (!form.title) return "Title is required";
    if (!form.startDate || !form.endDate) return "Dates are required";
    if (new Date(form.startDate) > new Date(form.endDate))
      return "Start date cannot be after end date";
    return null;
  };

  const submit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!tripData?.countryId) {
      setError("Select a country first");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data } = await Axios.post("/trip", {
        ...form,
        countryId: tripData.countryId,
      });
      if (!data?.payload?._id) throw new Error("Trip creation failed");

      setTripData({
        tripId: data.payload._id,
        startDate: form.startDate,
        endDate: form.endDate,
      });
      setCompleted({ planning: true });

      navigate("/trips/new/day-planning");
    } catch (err) {
      setError("Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      max-w-xl mx-auto py-10 space-y-6 
      bg-white/[0.03] 
      p-10 rounded-3xl 
      border border-white/10 
      shadow-[0_0_40px_-15px_rgba(0,0,0,0.8)]
      backdrop-blur-2xl
    "
    >
      <h1 className="text-2xl font-semibold text-white tracking-wide">
        Trip Planning
      </h1>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Trip title"
        className="
          w-full px-4 py-3 rounded-xl 
          bg-white/[0.05] 
          border border-white/10 
          text-white 
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      />

      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Description"
        className="
          w-full px-4 py-3 rounded-xl h-28 
          bg-white/[0.05] 
          border border-white/10 
          text-white 
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={onChange}
          className="
            px-4 py-3 rounded-xl 
            bg-white/[0.05] 
            border border-white/10 
            text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={onChange}
          className="
            px-4 py-3 rounded-xl 
            bg-white/[0.05] 
            border border-white/10 
            text-white 
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={submit}
          disabled={loading}
          className="
            px-7 py-3 rounded-xl 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white font-medium
            shadow-lg shadow-indigo-900/40
            hover:opacity-90 transition
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Planning;
