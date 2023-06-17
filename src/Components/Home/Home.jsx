import { useDispatch, useSelector } from "react-redux";
import {
  loadMore,
  hasMoreSelector,
  setSearchTerm,
} from "../../store/slices/postsSlice";
import Loading from "../Loading/Loading.jsx";
import PostList from "../PostsList/PostsList";
export default function Home() {
  const dispatch = useDispatch();
  const { loading, message, searchTerm } = useSelector((state) => state.posts);
  const hasMore = useSelector(hasMoreSelector);
  return (
    <div className="container mx-auto">
      <input
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="h-10 w-full mt-4 pl-4 rounded-l border-gray-400 border-2"
        placeholder="Search Posts by title or author name"
      />
      <PostList />
      {loading && (
        <div className="h-10 w-full grid place-items-center my-4 mt-6">
          <Loading />
        </div>
      )}
      {hasMore && (
        <button
          className="w-full block bg-blue-700 py-1 text-white rounded-l disabled:bg-blue-300 font-bold my-4 mt-6 text-xl"
          onClick={() => dispatch(loadMore())}
          disabled={loading}
        >
          Load more
        </button>
      )}
      {message === "fail" && (
        <p className="text-center text-2xl my-3 font-bold capitalize">
          There have been an error, please check your internet
        </p>
      )}
    </div>
  );
}
