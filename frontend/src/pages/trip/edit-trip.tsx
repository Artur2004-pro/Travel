import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import toast from "react-hot-toast";

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
      await Axios.put(`/trip/${id}`, form);
      toast.success("Trip updated");
      navigate("/my-trips");
    } catch (err) {
      toast.error("Failed to update trip");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6 bg-white/[0.03] p-10 rounded-3xl border border-white/10">
      <h1 className="text-2xl font-semibold text-white">Edit Trip</h1>
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Title"
        className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Description"
        className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white h-32"
      />
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={onChange}
        className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white"
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={onChange}
        className="w-full p-3 rounded-xl bg-white/[0.05] border border-white/10 text-white"
      />
      <button
        onClick={submit}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditTrip;
