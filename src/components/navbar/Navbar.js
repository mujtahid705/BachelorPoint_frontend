import styles from "./Navbar.module.css";
import logo from "../../assets/logo2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin } from "../../redux/appSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedin = useSelector((state) => state.app.isLoggedin);
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("bp-token");
    dispatch(setIsLoggedin(false));
    navigate("/login");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>

        <div className={styles.optionsContainer}>
          {isLoggedin && (
            <>
              <Link
                className={
                  location.pathname === "/"
                    ? styles.activeOption
                    : styles.options
                }
                to="/"
              >
                <p>Home</p>
              </Link>
              <Link
                className={
                  location.pathname === "/rentals"
                    ? styles.activeOption
                    : styles.options
                }
                to="/rentals"
              >
                <p>Rentals</p>
              </Link>
              <Link
                className={
                  location.pathname === "/profile"
                    ? styles.activeOption
                    : styles.options
                }
                to="/profile"
              >
                <p>Profile</p>
              </Link>
            </>
          )}

          {/* Will be available only for the admin */}
          {isLoggedin && (
            <Link
              className={
                location.pathname === "/admin"
                  ? styles.activeOption
                  : styles.options
              }
              to="/admin"
            >
              <p>Admin Panel</p>
            </Link>
          )}
        </div>

        <div className={styles.loginContainer}>
          {!isLoggedin && (
            <>
              <Link
                className={
                  location.pathname === "/login"
                    ? styles.activeLoginBtn
                    : styles.loginBtn
                }
                to="/login"
              >
                <div>Login</div>
              </Link>
              <Link
                className={
                  location.pathname === "/register"
                    ? styles.activeLoginBtn
                    : styles.loginBtn
                }
                to="/register"
              >
                <div>Register</div>
              </Link>
            </>
          )}
          {isLoggedin && (
            <>
              <Link
                className={
                  location.pathname === "/add_post"
                    ? styles.activeLoginBtn
                    : styles.loginBtn
                }
                to="/add_post"
              >
                <div>Add Post</div>
              </Link>
              <div className={styles.logoutBtn} onClick={logoutHandler}>
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
