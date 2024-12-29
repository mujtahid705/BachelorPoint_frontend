import styles from "./PageCover.module.css";

const ProfileCover = ({ name, bio, studentId, email, cover, dp }) => {
  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${cover})`,
          }}
          src={cover}
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
                <h2 className={styles.name}>{name}</h2>
                <div className={styles.line2}></div>
                <p className={styles.subtitle}>{bio}</p>
                <div className={styles.line3}></div>
                <p className={styles.subtitle}>ID: {studentId}</p>
                <p className={styles.subtitle}>email: {email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCover;
