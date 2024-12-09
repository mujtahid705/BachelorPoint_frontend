import styles from "./Navbar.module.css";
import logo from "../../assets/logo2.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>

        <div className={styles.optionsContainer}>
          <Link
            className={
              location.pathname === "/" ? styles.activeOption : styles.options
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
        </div>

        <div className={styles.loginContainer}>
          {/* <Link
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
          </Link> */}
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
          <div className={styles.logoutBtn}>Logout</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
