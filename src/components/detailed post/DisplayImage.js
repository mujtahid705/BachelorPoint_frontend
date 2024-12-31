import { useState } from "react";
import styles from "./DisplayImage.module.css";
import { imgBaseUrl } from "../../base_url";

const DisplayImage = ({ img }) => {
  const [displayImg, setDisplayImg] = useState(img[0]);
  return (
    <div className={styles.container}>
      <div className={styles.displayImgContainer}>
        <img
          className={styles.displayImg}
          src={`${imgBaseUrl}/${displayImg}`}
          alt="display_image"
        />
      </div>

      <div className={styles.imgContainer}>
        {img.map((src, index) => (
          <img
            key={index}
            className={styles.img}
            src={`${imgBaseUrl}/${src}`}
            alt="image"
            onClick={() => setDisplayImg(img[index])}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayImage;
