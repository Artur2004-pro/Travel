import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { IPost, IResponse } from "../../types";
import { useAuth } from "../../context/auth-context";
import EmptyState from "./empty-state";
import SkeletonGrid from "../components/layout/skeleton-grid";

export default function ProfilePosts() {
  const { account } = useAuth();
  const username = account?.username;
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }
    Axios.get<IResponse<IPost[]>>(`posts?username=${username}`)
      .then(({ data }) => setPosts(data.payload || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <SkeletonGrid count={9} />;
  if (!posts.length) return <EmptyState text="No posts yet. Create your first post" />;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-px bg-neutral-200 dark:bg-neutral-800">
      {posts.map((post) => {
        const base = String(import.meta.env.VITE_APP_DOMAIN || "");
        const thumb = post.thumbnail
          ? post.thumbnail.startsWith("http") || post.thumbnail.startsWith("data:")
            ? post.thumbnail
            : base + post.thumbnail
          : "";

        return (
          <div
            key={post._id}
            className="aspect-square bg-white dark:bg-neutral-950 overflow-hidden"
          >
            <img src={thumb} alt={post.title || "post"} loading="lazy" className="w-full h-full object-cover" />
          </div>
        );
      })}
    </div>
  );
}
