import { Link } from "react-router-dom";
import styles from "./RentalCard.module.css";
import { imgBaseUrl } from "../../base_url";

const RentalCard = ({
  id,
  image,
  title,
  description,
  rent,
  location,
  gender,
}) => {
  return (
    <Link className={styles.link} to={`/post/${id}`}>
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imgBaseUrl}/${image})` }}
        ></div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <p className={styles.description}>Available for: {gender}</p>
          <div className={styles.footer}>
            <span className={styles.location}>{location}</span>
            <span className={styles.price}>{rent} Taka</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RentalCard;
