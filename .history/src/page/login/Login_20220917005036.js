import styles from "./Login.module.scss";

const Login = () => {
    return (
        <div>
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <div className={styles.loginTitle}>Login</div>
                    <div className={styles.loginInput}>
                        <input type="text" placeholder="ID" />
                        <input type="password" placeholder="Password" />
                        <div className={styles.loginBtn}>Login</div>
                        <div className={styles.loginLink}>
                            <a href="#">Forgot Password?</a>
                            <a href="#">Sign Up</a>
        </div>
    )