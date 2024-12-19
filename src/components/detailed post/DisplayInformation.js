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
        {/* Potential BUG: Make sure the gender is semi capital */}
        {/* Gender can only be Any / Male / Female */}
        {data.gender === "Any" && (
          <>
            {"Gender:"} {data.gender} {"("}
            {<MaleIcon className={styles.male} />} or{" "}
            {<FemaleIcon className={styles.female} />}
            {")"}
          </>
        )}
        {data.gender === "Male" && (
          <>
            {"Gender:"} {data.gender}
            {<MaleIcon className={styles.male} />}
          </>
        )}
        {data.gender === "Female" && (
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

      {/* <div className={styles.pInfo}>
        <p className={styles.item}>Posted By:</p>
        <p className={styles.item}>
          Name:{" "}
          <span className={styles.available}>{data.personal_info.name}</span>
        </p>
        <p className={styles.item}>
          BracuId:{" "}
          <span className={styles.available}>{data.personal_info.bracuId}</span>
        </p>
        <p className={styles.item}>
          Email:{" "}
          <span className={styles.available}>{data.personal_info.email}</span>
        </p>
      </div> */}

      <div className={styles.action} onClick={onClick}>
        <CustomButton>Contact</CustomButton>
      </div>
    </div>
  );
};

export default DisplayInformation;
