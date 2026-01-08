import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import type { IPost, IResponse } from "../../types";
import EmptyState from "./empty-state";
import { Loader } from "../components";

export default function ProfilePosts() {
  const { username } = useParams();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get<IResponse<IPost[]>>(`posts?username=${username}`)
      .then(({ data }) => setPosts(data.payload))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return <Loader />;
  if (!posts.length) return <EmptyState text="No posts yet" />;

  return (
    <div className="grid grid-cols-3 gap-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <img
          key={post._id}
          src={post.thumbnail}
          className="w-full aspect-square object-cover rounded-sm"
        />
      ))}
    </div>
  );
}
