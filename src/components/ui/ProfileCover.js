import styles from "./PageCover.module.css";
import cover2 from "../../assets/cover2.jpg";
import dp from "../../assets/dp1.jpg";

const ProfileCover = ({ title, heading }) => {
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
            <div className={styles.profileContainer}>
              <div
                className={styles.dpContainer}
                style={{
                  backgroundImage: `url(${dp})`,
                }}
              ></div>
              <div>
                <h2 className={styles.name}>Muhammad Mujtahid</h2>
                <div className={styles.line2}></div>
                <p className={styles.subtitle}>This is an awesome bio!!</p>
                <div className={styles.line3}></div>
                <p className={styles.subtitle}>ID: 22299037</p>
                <p className={styles.subtitle}>
                  email: muhammad.mujtahid@g.bracu.ac.bd
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCover;
