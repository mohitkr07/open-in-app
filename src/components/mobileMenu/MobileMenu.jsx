import React from "react";
import styles from "./MobileMenu.module.css";
import Icons from "../../constants/Icons";

const MenuItem = ({ icon, menuTitle }) => (
  <div
    className={`${styles["menu-bar-menu-item"]} ${
      menuTitle === "Upload" && styles["selected-menu"]
    }`}
  >
    <img className={styles["menu-icon"]} src={icon} alt={menuTitle} />
    <p>{menuTitle}</p>
  </div>
);

const menuItems = [
  { icon: Icons.DashboardIcon, menuTitle: "Dashboard" },
  { icon: Icons.UploadIcon_Colored, menuTitle: "Upload" },
  { icon: Icons.InvoiceIcon, menuTitle: "Invoice" },
  { icon: Icons.ScheduleIcon, menuTitle: "Schedule" },
  { icon: Icons.CalendarIcon, menuTitle: "Calendar" },
  { icon: Icons.NotificationIcon_2, menuTitle: "Notification" },
  { icon: Icons.SettingIcon, menuTitle: "Settings" },
];

const MobileMenu = ({ closeNav }) => {
  return (
    <div className={styles["menu-bar"]}>
      <div className={styles["menu-bar-logo-container"]}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <img src={Icons.LogoIcon} alt="logo" />
          <p>Base</p>
        </span>
        <i
          onClick={closeNav}
          className="fa-solid fa-xmark fa-lg"
          style={{ color: "#999CA0", cursor: "pointer" }}
        />
      </div>
      <div className={styles["menu-bar-menu"]}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} icon={item.icon} menuTitle={item.menuTitle} />
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
