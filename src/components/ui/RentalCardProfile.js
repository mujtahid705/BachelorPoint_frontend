import { Link } from "react-router-dom";
import styles from "./RentalCard.module.css";
import { imgBaseUrl } from "../../base_url";

const RentalCardProfile = ({
  id,
  image,
  title,
  description,
  price,
  location,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.card}>
      <Link className={styles.link} to={`/post/${id}`}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${imgBaseUrl}/${image})` }}
        ></div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.footer}>
            <span className={styles.location}>{location}</span>
            <span className={styles.price}>{price} Taka</span>
          </div>
        </div>
      </Link>
      <div className={styles.actions}>
        <Link className={styles.link} to={`/edit_post/${id}`}>
          <button className={styles.editButton}>Edit</button>
        </Link>

        <button className={styles.deleteButton} onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RentalCardProfile;
