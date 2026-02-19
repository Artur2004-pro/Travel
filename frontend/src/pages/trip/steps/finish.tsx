// src/pages/trip/steps/Finish.tsx
import React, { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { ImagePlus } from "lucide-react";
import TripStepLayout from "../TripStepLayout";

export const Finish: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setCompleted } = useOutletContext<any>();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("cover", file);

    setLoading(true);
    setError(null);

    try {
      await Axios.post(`/trip/${tripData.tripId}/cover`, form);
      setCompleted({ finish: true });
      navigate(`/trip/${tripData.tripId}`);
    } catch {
      setError("Failed to upload cover");
    } finally {
      setLoading(false);
    }
  };

  const useDefault = async () => {
    setLoading(true);
    setError(null);

    try {
      await Axios.post(`/trip/${tripData.tripId}/cover`, { useDefault: true });
      setCompleted({ finish: true });
      navigate(`/trip/${tripData.tripId}`);
    } catch {
      setError("Failed to set default cover");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TripStepLayout
      title="Add cover"
      subtitle="Choose a cover image for your trip"
      stepIndex={6}
      totalSteps={6}
      onNext={upload}
      onBack={() => navigate(-1)}
      nextDisabled={loading || !file}
      nextLabel={file ? "Finish" : "Continue"}
    >
      <div className="max-w-sm mx-auto px-0 pt-8 pb-4 flex flex-col items-center gap-6">
        <div className="text-sm text-zinc-500 text-center">Choose a cover image for your trip</div>

        <div
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center cursor-pointer active:scale-[0.97] transition-transform"
        >
          {file ? (
            <img src={URL.createObjectURL(file)} alt="Trip cover preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400">
              <ImagePlus className="w-8 h-8" />
              <span className="text-xs">Tap to upload</span>
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}

        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <div className="h-4" />
        <div className="flex gap-3 w-full">
          <button onClick={useDefault} disabled={loading} className="flex-1 py-3 rounded-full bg-white/5 text-sm">
            Use default
          </button>
        </div>
      </div>
    </TripStepLayout>
  );
};

export default Finish;
