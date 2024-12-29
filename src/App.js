import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./pages/RegisterPage";
import RentalPage from "./pages/RentalPage";
import ProfilePage from "./pages/ProfilePage";
import AddPost from "./pages/AddPost";
import EditProfilePage from "./pages/EditProfilePage";
import EditPost from "./pages/EditPost";
import DetailedPostPage from "./pages/DetailedPostPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import Footer from "./components/navbar/Footer";
import { useEffect } from "react";
import useInitialize from "./hooks/useInitialize";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin, setUser } from "./redux/appSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.app.isLoggedin);
  const triggerReload = useSelector((state) => state.app.triggerReload);

  // Checking the validity of the token and fetching the user data
  const initialize = useInitialize();
  useEffect(() => {
    const checkToken = async () => {
      const userData = await initialize(); // function from the useInitialize custom hook

      if (userData.error) {
        localStorage.removeItem("bp-token");
        dispatch(setIsLoggedin(false));
        dispatch(setUser(null));
        navigate("/login");
      } else {
        dispatch(setIsLoggedin(true));
        dispatch(setUser(userData));
      }
    };

    checkToken();
  }, [isLoggedin, triggerReload]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/rentals" element={<RentalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="profile/edit_profile" element={<EditProfilePage />} />
        <Route path="/add_post" element={<AddPost />} />
        <Route path="edit_post/:id" element={<EditPost />} />
        <Route path="post/:id" element={<DetailedPostPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
