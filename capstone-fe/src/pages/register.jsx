import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import "../styles/global.css";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const nav = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/register", form);

      
      if (res.status === 201 || res.status === 200) {
        nav("/login");
      } else {
        setError("Registration failed");
      }

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="glass-card" style={{ width: "350px" }}>
      <h3 className="text-center mb-4">Create Account 🚀</h3>

      {error && <p className="text-danger text-center">{error}</p>}

      <input
        name="fullName"
        className="input-modern mb-3 w-100"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
      />

      <input
        name="email"
        className="input-modern mb-3 w-100"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        className="input-modern mb-3 w-100"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button
        className="btn-modern w-100"
        onClick={register}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "#00c6ff" }}
          onClick={() => nav("/login")}
        >
          Login
        </span>
      </p>
    </div>
  </div>
)};