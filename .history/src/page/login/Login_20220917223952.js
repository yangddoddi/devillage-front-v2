import styles from "./Login.module.scss";
import {
  GithubLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../utils/loginHandler";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRefreshCookie } from "../../storeage/Cookie";
import { auth } from "../../api/Auth";

export const Login = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

    const onClickHandler = async () => {
    const data = await auth.login(email, password);
    if (data) {
        login(data);
        dispatch(setRefreshCookie());
        navi("/");
    }

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>Login</div>
          <div className={styles.loginInput}>
            <form className={styles.form} onSubmit={onLoginHandler}>
              <input
                className={styles.inputBox}
                onChange={onChangeEmail}
                type="text"
                placeholder="ID"
              />{" "}
              <br />
              <input
                className={styles.inputBox}
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </form>
            <div className={styles.loginBtn}>Login</div>
          </div>
          <GithubLoginButton
            style={{
              width: "350px",
              marginBottom: "10px",
              height: "40px",
              fontSize: "15px",
            }}
          />
          <GoogleLoginButton
            style={{
              width: "350px",
              marginBottom: "10px",
              height: "40px",
              fontSize: "15px",
            }}
          />
          <AppleLoginButton
            style={{
              width: "350px",
              marginBottom: "10px",
              height: "40px",
              fontSize: "15px",
            }}
          />
          <div className={styles.loginLink}>
            <a href="#">Forgot Password?</a>
            <Link to="/join">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
