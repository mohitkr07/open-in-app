import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AuthScreen.module.css";
import Icons from "../../constants/Icons";
import MobileNav1 from "../../components/mobilenav1/MobileNav1";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthScreen = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const response = jwtDecode(credentialResponse.credential);
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response));

    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTimeout(() => {
      navigate("/upload");
    }, 1000);
  };

  const handleLoginError = () => {
    console.log("Login Failed");
    toast.error("Login failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    toast.warning("Only login with Google is allowed! ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const Warning2 = (event) => {
    event.preventDefault();
    toast.warning("Try Logging with Google! ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <MobileNav1 />
      <div className={styles["link-container"]}>
        <div className={styles["logo"]}>
          <img src={Icons.WhiteCircle} alt="Logo" />
          <img src={Icons.ZigZag} alt="ZigZag" />
        </div>
        <p className={styles["base-title"]}>BASE</p>
        <div className={styles["links"]}>
          <img src={Icons.GithubIcon} alt="Github" />
          <img src={Icons.TwitterIcon} alt="Twitter" />
          <img src={Icons.LinkedInIcon} alt="LinkedIn" />
          <img src={Icons.DiscordIcon} alt="Discord" />
        </div>
      </div>
      <div className={styles["form-container"]}>
        <div className={styles["sub-container"]}>
          <div className={styles["form-title"]}>
            <p>Sign In</p>
            <p>Sign in to your account</p>
          </div>
          <div className={styles["login-options"]}>
            <GoogleLogin
              size="medium"
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
            <div onClick={handleFormSubmit} className={styles["option"]}>
              <img src={Icons.AppleIcon} alt="Apple" />
              <p>Sign in with Apple</p>
            </div>
          </div>
          <form onSubmit={handleFormSubmit} className={styles["form"]}>
            <div className={styles["input"]}>
              <p>Email address</p>
              <input type="text" placeholder="email" />
            </div>
            <div className={styles["input"]}>
              <p>Password</p>
              <input type="password" placeholder="password" />
            </div>
            <p className={styles["link-txt"]}>Forgot password?</p>
            <button type="submit" className={styles["submit-btn"]}>
              Sign In
            </button>
          </form>
          <div className={styles["register-option"]}>
            <p>Don't have an account?</p>{" "}
            <p onClick={Warning2}>Register here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
