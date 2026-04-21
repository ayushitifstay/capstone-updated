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

      // IMPORTANT: check backend response
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
    <div>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="fullName"
        placeholder="Name"
        value={form.fullName}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={register} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}