import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersThunk } from "./store/slices/user.slice.js";
import { postsData } from "./store/slices/postsSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersThunk());
    dispatch(postsData());
  }, []);
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}
export default App;
