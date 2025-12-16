// src/pages/Finish.tsx
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";

export const Finish: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setCompleted } = useOutletContext<any>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async () => {
    if (!file) {
      setError("Please select an image");
      return;
    }

    const form = new FormData();
    form.append("cover", file);

    setLoading(true);
    setError(null);

    try {
      await Axios.post(`/trip/${tripData.tripId}/cover`, form);
      setCompleted({ finish: true });
      navigate(`/trip/${tripData.tripId}`);
    } catch {
      setError("Failed to upload cover.");
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
      setError("Failed to set default cover.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-8">
          You're Done!
        </h1>

        <p className="text-2xl text-zinc-300 mb-12">
          Final step: upload a cover image or use the default one
        </p>

        <div className="
          bg-white/[0.05] 
          backdrop-blur-2xl 
          rounded-3xl 
          p-12 
          border border-white/10
          shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)]
        ">
          {error && <p className="text-red-400 mb-4">{error}</p>}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="
              block w-full text-lg
              file:mr-6 
              file:py-4 
              file:px-8 
              file:rounded-2xl
              file:bg-gradient-to-r 
              file:from-indigo-600 
              file:to-purple-600
              file:text-white 
              file:font-semibold 
              file:border-0
              file:shadow-lg
            "
          />

          {file && (
            <img
              src={URL.createObjectURL(file)}
              className="mt-6 rounded-2xl mx-auto max-h-96 shadow-lg"
            />
          )}

          <div className="flex gap-6 mt-12">
            <button
              onClick={useDefault}
              disabled={loading}
              className="
                flex-1 py-5 rounded-2xl 
                border border-white/20 
                bg-white/[0.03]
                hover:bg-white/[0.08] 
                transition 
                font-bold
                text-white
              "
            >
              Use Default
            </button>

            <button
              onClick={upload}
              disabled={loading || !file}
              className="
                flex-1 py-5 rounded-2xl 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                font-bold text-xl text-white
                shadow-lg shadow-indigo-900/40
                hover:opacity-90 
                transition 
                disabled:opacity-40
              "
            >
              {loading ? "Uploading..." : "Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finish;
