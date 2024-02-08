import styles from "./AuthScreen.module.css";
import Icons from "../../constants/Icons";
const AuthScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles["link-container"]}>
        <div className={styles["logo"]}>
          <img src={Icons.WhiteCircle} />
          <img src={Icons.ZigZag} />
        </div>

        <p className={styles["base-title"]}>BASE</p>

        <div className={styles["links"]}>
          <img src={Icons.GithubIcon} />
          <img src={Icons.TwitterIcon} />
          <img src={Icons.LinkedInIcon} />
          <img src={Icons.DiscordIcon} />
        </div>
      </div>

      <div className={styles["form-container"]}>
        <div className={styles["sub-container"]}>
          <div className={styles["form-title"]}>
            <p>Sign In</p>
            <p>Sign in to your account</p>
          </div>

          <div className={styles["login-options"]}>
            <div className={styles["option"]}>
              <img src={Icons.GoogleIcon} />
              <p>Sign in with Google</p>
            </div>
            <div className={styles["option"]}>
              <img src={Icons.AppleIcon} />
              <p>Sign in with Apple</p>
            </div>
          </div>
          <form className={styles["form"]}>
            <div className={styles["input"]}>
              <p>Email address</p>
              <input type="text" placeholder="email" />
            </div>
            <div className={styles["input"]}>
              <p>Password</p>
              <input type="password" placeholder="password" />
            </div>

            <p className={styles["link-txt"]}>Forgot password?</p>

            <button className={styles["submit-btn"]}>Sign In</button>
          </form>

          <div className={styles["register-option"]}>
            <p>Don't have an account?</p> <p>Register here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
