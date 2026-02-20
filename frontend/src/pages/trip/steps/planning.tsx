import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import TripStepLayout from "../TripStepLayout";
import { useTripWizard } from '../../../context/trip-wizard-context';

export const Planning: React.FC = () => {
  const navigate = useNavigate();
  const wizard = useTripWizard();
  const { tripData, setTripData, setCompleted, registerValidator, unregisterValidator } = wizard;

  const form = {
    title: tripData?.title || "",
    description: tripData?.description || "",
    startDate: tripData?.startDate || "",
    endDate: tripData?.endDate || "",
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTripData({ [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.title) return "Give your trip a name";
    if (!form.startDate || !form.endDate) return "Select your travel dates";
    if (new Date(form.startDate) > new Date(form.endDate)) return "Dates don’t make sense";
    return null;
  };

  useEffect(() => {
    registerValidator('planning', () => {
      return validate() === null;
    });
    return () => unregisterValidator('planning');
  }, [form.title, form.startDate, form.endDate]);

  const submit = async () => {
    const err = validate();
    if (err) return setError(err);
    if (!tripData?.countryId) return setError("Select country first");

    try {
      setLoading(true);
      setError(null);

      const { data } = await Axios.post("/trip", {
        title: form.title,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        countryId: tripData.countryId,
      });

      if (!data?.payload?._id) throw new Error();

      setTripData({
        tripId: data.payload._id,
        startDate: form.startDate,
        endDate: form.endDate,
        title: form.title,
        description: form.description,
      });

      setCompleted('planning', true);
      navigate("/trips/new/day-planning");
    } catch {
      setError("Could not create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TripStepLayout
      title="New trip"
      subtitle="Create a new trip"
      stepIndex={2}
      totalSteps={6}
      onNext={submit}
      nextDisabled={loading}
      onBack={() => navigate(-1)}
    >
      <div className="max-w-sm mx-auto px-0 pt-2 pb-4 space-y-8">
        <div className="space-y-2">
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="Summer in Italy"
            className="w-full text-2xl font-semibold bg-transparent placeholder:text-zinc-400 outline-none"
          />
          <p className="text-sm text-zinc-500">Name your trip</p>
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={2}
          placeholder="What is this trip about?"
          className="w-full bg-transparent text-sm placeholder:text-zinc-400 resize-none outline-none"
        />

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
      </div>
    </TripStepLayout>
  );
};

export default Planning;

