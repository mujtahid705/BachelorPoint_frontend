import styles from "./HomePage.module.css";
import cover1 from "../assets/cover1.jpg";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import cover2 from "../assets/cover2.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.app.isLoggedin);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f0f0",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            marginBottom: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundImage: `url(${cover1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>Welcome to BachelorPoint</h1>
          <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
            BachelorPoint is your one-stop solution for finding rental
            apartments, roommates, and more. Designed specifically for the
            students of BRAC University, our platform makes it easy to find the
            perfect place to live and the right people to share it with.
          </p>

          <Link to="/rentals">
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                color: "#fff",
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Explore Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
