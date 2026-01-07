// src/pages/trip/steps/Finish.tsx
import React, { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { ImagePlus, ChevronLeft } from "lucide-react";

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
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 h-12 flex items-center px-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 active:opacity-60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="flex-1 text-center text-sm font-semibold">Add cover</h1>

        <button
          onClick={useDefault}
          disabled={loading}
          className="text-sm font-medium text-sky-500 disabled:opacity-40"
        >
          Skip
        </button>
      </header>

      {/* CONTENT */}
      <main className="max-w-sm mx-auto px-4 pt-8 pb-28 flex flex-col items-center gap-6">
        <p className="text-sm text-zinc-500 text-center">
          Choose a cover image for your trip
        </p>

        {/* COVER PREVIEW */}
        <div
          onClick={() => inputRef.current?.click()}
          className="
            w-full aspect-[4/5]
            rounded-xl overflow-hidden
            bg-zinc-100 dark:bg-zinc-900
            flex items-center justify-center
            cursor-pointer
            active:scale-[0.97]
            transition-transform
          "
        >
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Trip cover preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-400">
              <ImagePlus className="w-8 h-8" />
              <span className="text-xs">Tap to upload</span>
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </main>

      {/* BOTTOM CTA */}
      <div className="fixed bottom-0 inset-x-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur px-4 py-3">
        <button
          onClick={upload}
          disabled={loading || !file}
          className="
            w-full h-11 rounded-md
            bg-sky-500 text-white
            text-sm font-semibold
            disabled:opacity-40
          "
        >
          {loading ? "Saving…" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Finish;
