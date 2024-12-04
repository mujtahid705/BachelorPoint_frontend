import styles from "./Navbar.module.css";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="logo" />
        </div>

        <div className={styles.optionsContainer}>
          <Link className={styles.options} to="/">
            <p>Home</p>
          </Link>
          <Link className={styles.options} to="/rentals">
            <p>Rentals</p>
          </Link>
          <Link className={styles.options} to="/your_posts">
            <p>Your Posts</p>
          </Link>
          <Link className={styles.options} to="/profile">
            <p>Profile</p>
          </Link>
        </div>

        <div className={styles.loginContainer}>
          <Link className={styles.loginBtn} to="/login">
            <div>Login</div>
          </Link>
          <Link className={styles.loginBtn} to="/register">
            <div>Register</div>
          </Link>
          {/* <div className={styles.logoutBtn}>Logout</div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
