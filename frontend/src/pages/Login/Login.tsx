import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { login } from "../../services/scheduleService";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.access_token);
      navigate("/schedules");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.labelContainer}>
            <label className={styles.label}>Email</label>
          </div>
          <input
            placeholder="Input email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
            className={styles.input}
          />
          <div className={styles.labelContainer}>
            <label className={styles.label}>Password</label>
          </div>
          <input
            placeholder="Input password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
            className={styles.input}
          />
          <div className={styles.btnContainer}>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
