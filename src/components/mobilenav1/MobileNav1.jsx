import styles from "./MobileNav1.module.css";
import Icons from "../../constants/Icons";

const MobileNav1 = () => {
  return (
    <div className={styles.container}>
      <div className={styles["logo-container"]}>
        <div className={styles["logo"]}>
          <img src={Icons.WhiteCircle} />
          <img src={Icons.ZigZag} />
        </div>
        <p>Base</p>
      </div>
    </div>
  );
};

export default MobileNav1;
