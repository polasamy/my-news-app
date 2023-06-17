import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { postsSelector, hasMoreSelector } from "../../store/slices/postsSlice";

export default function PostList() {
  const searchTerm = useSelector((state) => state.posts.searchTerm);
  const posts = useSelector(postsSelector);
  const hasMore = useSelector(hasMoreSelector);
  if (!posts.length && hasMore && searchTerm) {
    return (
      <p className=" text-2xl font-bold">
        {" "}
        There's no posts matching the current search term, try loading more
        posts
      </p>
    );
  }
  if (!posts.length && !hasMore && searchTerm) {
    return (
      <p className=" text-2xl font-bold">
        There's no posts matching the current search term
      </p>
    );
  }
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 auto-cols-max gap-4">
      {posts.map((post) => (
        <Card post={post} key={post.id} />
      ))}
    </div>
  );
}
