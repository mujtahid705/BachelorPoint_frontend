import styles from "./PageCover.module.css";
import cover2 from "../../assets/cover2.jpg";

const PageCover = ({ title, heading }) => {
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${cover2})`,
          }}
          src={cover2}
          alt="page_cover_image"
        >
          <div className={styles.overlay}>
            <div className={styles.textContainer}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.line}></div>
              <p className={styles.subtitle}>{heading}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageCover;
