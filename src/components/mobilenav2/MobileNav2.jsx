import styles from "./MobileNav2.module.css";
import Icons from "../../constants/Icons";

const MobileNav2 = ({ picture, openNav }) => {
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <i
          onClick={openNav}
          className="fa-solid fa-bars fa-xl"
          style={{ userSelect: "none" }}
        />
        <div className={styles["logo-container"]}>
          <div className={styles["logo"]}>
            <img src={Icons.LogoIcon} />
          </div>
          <p>Base</p>
        </div>
      </div>
      <div className={styles["nav-right"]}>
        <div className={styles["notification-icon"]}>
          <img src={Icons.NotificationIcon} alt="notification" />
        </div>
        <div className={styles["profile"]}>
          <img src={picture} />
        </div>
      </div>
    </div>
  );
};

export default MobileNav2;
