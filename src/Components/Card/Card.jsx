import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deletePost } from "../../store/slices/postsSlice.js";

function truncate(str) {
  return str.slice(0, 50).trim() + "... Read more";
}
export default function Card({ post: { title, body, user, id } }) {
  const dispatch = useDispatch();
  const [showFullText, setShowFullText] = useState(false);
  const isDeleting = useSelector((state) => state.posts.deleting.includes(id));
  function toggleShowFullText() {
    setShowFullText((b) => !b);
  }
  return (
    <article className="text-gray-700 h-100">
      <div className="border-2 overflow-hidden rounded-md p-3 my-2 bg-gray-50 flex flex-col h-full">
        <h1 className="text-3xl font-extrabold capitalize"> {title}</h1>
        <p
          onClick={toggleShowFullText}
          className="cursor-pointer my-2 flex flex-1"
        >
          {showFullText ? body : truncate(body)}
        </p>
        <p>
          By <span className="font-bold mr-2"> {user?.name}</span>
          published on{" "}
          <time className="font-bold" dateTime="2023-08-05">
            {" "}
            2023/8/5{" "}
          </time>
        </p>
        <button
          onClick={() => {
            dispatch(deletePost(id));
          }}
          disabled={isDeleting}
          className="w-full py-1 bg-red-600 text-white mt-2 rounded-l disabled:bg-red-300 uppercase font-bold"
        >
          {isDeleting ? "loading..." : "delete"}
        </button>
      </div>
    </article>
  );
}
