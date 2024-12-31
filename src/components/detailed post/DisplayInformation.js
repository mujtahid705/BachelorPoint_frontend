import styles from "./DisplayInformation.module.css";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import CustomButton from "../ui/CustomButton";

const DisplayInformation = ({ data, onClick }) => {
  return (
    <div className={styles.detailesContainer}>
      <p className={styles.title}>{data.title}</p>
      <div className={styles.bar} />
      <p className={styles.description}>{data.description}</p>
      <p className={styles.item}>
        {data.gender === "any" && (
          <>
            {"Gender:"} {data.gender} {"("}
            {<MaleIcon className={styles.male} />} or{" "}
            {<FemaleIcon className={styles.female} />}
            {")"}
          </>
        )}
        {data.gender === "male" && (
          <>
            {"Gender:"} {data.gender}
            {<MaleIcon className={styles.male} />}
          </>
        )}
        {data.gender === "female" && (
          <>
            {"Gender:"} {data.gender}
            {<FemaleIcon className={styles.female} />}
          </>
        )}
      </p>
      <p className={styles.item}>
        Rent: <span className={styles.rent}> ৳ {data.rent}</span>
      </p>
      <p className={styles.item}>
        Available From:{" "}
        <span className={styles.available}>{data.available_from}</span>
      </p>
      <p className={styles.item}>
        Address: <span className={styles.available}>{data.location}</span>
      </p>

      <div className={styles.action} onClick={() => onClick(data.id)}>
        <CustomButton>Contact</CustomButton>
      </div>
    </div>
  );
};

export default DisplayInformation;
