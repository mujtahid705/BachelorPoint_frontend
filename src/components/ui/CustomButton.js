import styles from "./CustomButton.module.css";

const CustomButton = ({ children }) => {
  return <div className={styles.btn}>{children}</div>;
};

export default CustomButton;
