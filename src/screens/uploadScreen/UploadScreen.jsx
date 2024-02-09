import React, { useEffect, useRef, useState } from "react";
import styles from "./UploadScreen.module.css";
import Icons from "../../constants/Icons";
import Uploads from "../../components/uploads/Uploads";
import { TailSpin } from "react-loader-spinner";
import * as XLSX from "xlsx";
import Colors from "../../constants/Colors";
import MobileNav2 from "../../components/mobilenav2/MobileNav2";
import MobileMenu from "../../components/mobileMenu/MobileMenu";
import { ToastContainer, toast } from "react-toastify";

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

const screenWidth = window.innerWidth;

const UploadScreen = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const uploadRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("Upload File");
  const [jsonData, setJsonData] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const [uploadedData, setUploadedData] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const isAuthenticated = localStorage.getItem("user");

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, []);

  const handleUploadClick = () => {
    setUploading(true);
    setUploadedData(jsonData);
    setUploadedFileName(fileName);

    setTimeout(() => {
      setJsonData(null);
      setFileName(null);
      setUploading(false);
      setShowTable(true);
      toast.success("Upload successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      uploadRef.current.value = null;
    }, 1000);
  };

  const handleFileChange = async (file) => {
    setFileName(file ? file.name : "Upload File");

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const expectedHeaders = ["id", "links", "prefix", "select tags"];

      const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];

      const isValidFile = expectedHeaders.every((header) =>
        headers.includes(header)
      );

      if (!isValidFile) {
        toast.warning("Incorrect file structure/format!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const sheetJson = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      sheetJson.shift();

      const jsonData = sheetJson.map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });

      setJsonData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    uploadRef.current.click();
  };

  const handleRemoveFile = () => {
    setFileName("Upload File");
    setJsonData(null);
    setShowTable(false);
    uploadRef.current.value = null;
  };

  const handleOnSelectTag = (ind, tag) => {
    setUploadedData((prev) => {
      const data = [...prev];
      const selectedTags = data[ind]["selected tags"] || [];
      if (!selectedTags.includes(tag)) {
        data[ind]["selected tags"] = [...selectedTags, tag];
      }
      return data;
    });
    console.log("screen", tag);
  };

  const handleRemoveTag = (ind, tag) => {
    setUploadedData((prev) => {
      const data = [...prev];
      data[ind]["selected tags"] = data[ind]["selected tags"].filter(
        (item) => item !== tag
      );
      return data;
    });
  };

  const handleNav = (res) => {
    res ? setShowMobileNav(true) : setShowMobileNav(false);
  };

  const picture = JSON.parse(localStorage.getItem("user"))?.picture;

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    isAuthenticated && (
      <div className={styles["container"]}>
        <div className={styles["menu-bar"]}>
          <div className={styles["menu-bar-logo-container"]}>
            <img src={Icons.LogoIcon} alt="logo" />
            <p>Base</p>
          </div>
          <div className={styles["menu-bar-menu"]}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                icon={item.icon}
                menuTitle={item.menuTitle}
              />
            ))}
          </div>
        </div>
        {showMobileNav && <MobileMenu closeNav={() => handleNav(false)} />}
        <MobileNav2 picture={picture} openNav={() => handleNav(true)} />

        <div className={styles["content-view"]}>
          <div className={styles["top-nav"]}>
            <p className={styles["title"]}>Upload CSV</p>

            <div className={styles["nav-right"]}>
              <div className={styles["notification-icon"]}>
                <img src={Icons.NotificationIcon} alt="notification" />
              </div>
              <div className={styles["profile"]}>
                <img src={picture} />
              </div>
            </div>
          </div>
          <div className={styles["upload-view"]}>
            <div
              className={styles["upload-dialogue"]}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
            >
              <div className={styles["upload-box"]}>
                <img src={Icons.ExcelLogo} alt="excel_logo" />
                {jsonData ? (
                  <>
                    <p>{fileName}</p>
                    <p
                      onClick={handleRemoveFile}
                      style={{ color: Colors.ALERT_RED, cursor: "pointer" }}
                    >
                      Remove
                    </p>
                  </>
                ) : screenWidth > 768 ? (
                  <p>
                    Drop your excel sheet here or{" "}
                    <span onClick={handleUpload}>browse</span>
                  </p>
                ) : (
                  <p>
                    Upload you excel sheet
                    <span onClick={handleUpload}> here</span>
                  </p>
                )}
                <input
                  style={{ display: "none" }}
                  ref={uploadRef}
                  type="file"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                />
              </div>

              <div
                style={{
                  opacity: jsonData ? "100%" : "50%",
                  pointerEvents: jsonData ? "auto" : "none",
                }}
                onClick={handleUploadClick}
                className={styles["upload-btn"]}
              >
                {uploading ? (
                  <TailSpin
                    visible={true}
                    height="25"
                    width="25"
                    color="#ffffff"
                    ariaLabel="tail-spin-loading"
                    radius="2"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <>
                    <img src={Icons.Upload} />
                    <p>Upload</p>
                  </>
                )}
              </div>
            </div>

            {showTable ? (
              <Uploads
                jsonData={uploadedData}
                onSelectTag={handleOnSelectTag}
                removeTag={handleRemoveTag}
              />
            ) : null}
          </div>
        </div>
        <ToastContainer />
      </div>
    )
  );
};

export default UploadScreen;
