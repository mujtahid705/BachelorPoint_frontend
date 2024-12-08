import styles from "./HomePage.module.css";
import cover1 from "../assets/cover1.jpg";
// import cover2 from "../assets/cover2.jpg";

const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.coverContainer}>
          <div
            className={styles.cover}
            style={{
              backgroundImage: `url(${cover1})`,
            }}
          >
            <div className={styles.overlay}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
