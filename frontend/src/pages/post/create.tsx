import { useState, type ChangeEvent } from "react";
import { X, Smile, Paperclip } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { Axios } from "../../lib/axios-config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { account: currentUser } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const post = async (content: string, imageFiles: File[]) => {
    const formData = new FormData();
    imageFiles.forEach((img) => formData.append("post", img));
    formData.append("content", content);
    formData.append("title", "my post");
    const { data } = await Axios.post("posts/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  };

  const handleSubmit = async () => {
    if (!text && images.length === 0) return;
    setLoading(true);
    try {
      await post(text, images.length ? images : []);
      setText("");
      setImages([]);
      setPreviews([]);
      toast.success("Post created");
      navigate("/profile");
    } catch {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return <div className="text-center py-10 text-sm text-neutral-500">Loading...</div>;

  return (
    <div className="max-w-feed mx-auto px-4 py-6 pb-24 md:pb-10">
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-950">
        <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800">
          <img
            src={import.meta.env.VITE_APP_DOMAIN + currentUser.avatar}
            alt={currentUser.username}
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-semibold text-sm">{currentUser.username}</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full resize-none bg-transparent text-neutral-900 dark:text-neutral-100 p-4 text-sm placeholder:text-neutral-400 focus:outline-none"
          rows={4}
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-4 pb-4">
            {previews.map((src, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 text-neutral-500">
          <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Paperclip size={20} strokeWidth={2} />
            <span className="text-sm hidden sm:inline">Add photos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <button className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <Smile size={20} strokeWidth={2} />
            <span className="text-sm hidden sm:inline">Emoji</span>
          </button>
        </div>

        <div className="px-4 pb-4">
          {images.length === 0 && (
          <p className="text-xs text-neutral-500 mb-2">Add at least one photo to post</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={images.length === 0 || loading}
          className="w-full py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? "Posting…" : "Post"}
        </button>
        </div>
      </div>
    </div>
  );
}
