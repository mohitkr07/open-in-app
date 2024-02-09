import styles from "./Uploads.module.css";
import Icons from "../../constants/Icons";
import CustomDropdown from "../customDropdown/CustomDropdown";
import Colors from "../../constants/Colors";

const Uploads = ({ jsonData, onSelectTag, removeTag }) => {
  const handleOnselect = (ind, txt) => {
    console.log("upload", txt);
    onSelectTag(ind, txt);
  };

  console.log(jsonData);

  return (
    <div className={styles["container"]}>
      <p>Uploads</p>

      <div className={styles["table"]}>
        <table>
          <thead>
            <tr className={styles["head-tr"]}>
              <th>SI No.</th>
              <th>Links</th>
              <th>Prefix</th>
              <th>Add Tags</th>
              <th>Selected Tags</th>
            </tr>
          </thead>
          <tbody>
            {jsonData?.map((item, ind) => {
              const tagsArray = item["select tags"]
                .split(",")
                .map((tag) => tag.trim());

              return (
                <tr className={styles["row-tr"]}>
                  <td>{(ind + 1).toString().padStart(2, "0")}</td>
                  <td>
                    <a
                      style={{
                        color: Colors.PRIMARY,
                      }}
                      href={`https://${item.links}`}
                      target="_blank"
                    >
                      {item.links}
                    </a>
                  </td>
                  <td>{item.prefix}</td>
                  <td>
                    <CustomDropdown
                      data={tagsArray}
                      onSelect={(txt) => handleOnselect(ind, txt)}
                    />
                  </td>
                  <td>
                    <div className={styles["tags"]}>
                      {item["selected tags"]?.map((item2, index) => (
                        <p>
                          {item2}
                          <span>
                            <i
                              onClick={() => removeTag(ind, item2)}
                              className="fa-solid fa-xmark fa-lg"
                              style={{
                                color: "#ffffff",
                                cursor: "pointer",
                                padding: "1px 1px 0 1px",
                              }}
                            />
                          </span>
                        </p>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Uploads;
