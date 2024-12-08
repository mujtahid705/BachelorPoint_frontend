import styles from "./RentalCard.module.css";

const RentalCard = ({ image, title, description, price, location }) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.location}>{location}</span>
          <span className={styles.price}>{price}</span>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
