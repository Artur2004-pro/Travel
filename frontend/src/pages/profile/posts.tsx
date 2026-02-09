import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { IPost, IResponse } from "../../types";
import { useAuth } from "../../context/auth-context";
import EmptyState from "./empty-state";
import { Loader } from "../components";

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

  if (loading) return <Loader />;
  if (!posts.length) return <EmptyState text="No posts yet" />;

  return (
    <div className="grid grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800">
      {posts.map((post) => (
        <div
          key={post._id}
          className="aspect-square bg-white dark:bg-neutral-950 overflow-hidden"
        >
          <img
            src={post.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
