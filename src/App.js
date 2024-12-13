import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./pages/RegisterPage";
import RentalPage from "./pages/RentalPage";
import ProfilePage from "./pages/ProfilePage";
import AddPost from "./pages/AddPost";
import EditProfilePage from "./pages/EditProfilePage";
import EditPost from "./pages/EditPost";

const App = () => {
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
      </Routes>
    </>
  );
};

export default App;
