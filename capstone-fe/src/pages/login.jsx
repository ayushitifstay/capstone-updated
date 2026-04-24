import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      
      if (!email || !password) {
        alert("Please enter email and password");
        return;
      }

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      
      nav("/");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="glass-card" style={{ width: "350px" }}>
      <h3 className="text-center mb-4">Welcome Back 👋</h3>

      <input
        className="input-modern mb-3 w-100"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input-modern mb-3 w-100"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn-modern w-100" onClick={handleLogin}>
        Login
      </button>

      <p className="text-center mt-3">
        Don’t have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#00c6ff" }}
          onClick={() => nav("/register")}
        >
          Register
        </span>
      </p>
    </div>
  </div>
)};