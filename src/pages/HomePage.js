import styles from "./HomePage.module.css";
import cover1 from "../assets/cover1.jpg";
import cover2 from "../assets/cover2.jpg";

const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.coverContainer}>
          <img className={styles.cover} src={cover1} alt="cover_image" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
