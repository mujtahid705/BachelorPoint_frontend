import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/navbar/Navbar";
import RegisterPage from "./pages/RegisterPage";
import RentalPage from "./pages/RentalPage";
import ProfilePage from "./pages/ProfilePage";
import AddPost from "./pages/AddPost";

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
        <Route path="/add_post" element={<AddPost />} />
      </Routes>
    </>
  );
};

export default App;
