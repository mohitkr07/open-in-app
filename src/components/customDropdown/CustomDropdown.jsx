import React, { useState } from "react";
import styles from "./CustomDropdown.module.css";

const CustomDropdown = ({ onSelect, data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleDropdown = (txt) => {
    onSelect(txt);
    setSelected(txt);
    setShowDropdown(false);
  };

  return (
    <div
      // style={{
      //   borderBottomLeftRadius: showDropdown ? "0" : "8px",
      //   borderBottomRightRadius: showDropdown ? "0" : "8px",
      // }}
      className={styles.container}
    >
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className={styles.dropdown}
      >
        <p>{"Selected Tags"}</p>
        <i className="fa-solid fa-angle-down" />
      </div>

      {showDropdown && (
        <div className={styles.list}>
          {data.map((item, ind) => (
            <p key={ind} onClick={() => handleDropdown(item)}>
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
