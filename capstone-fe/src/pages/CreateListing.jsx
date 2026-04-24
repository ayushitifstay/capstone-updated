import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/create.css";
import "../styles/global.css";

export default function CreateListing() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    mealType: "",
    pricePerDay: "",
    location: ""
  });

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
    }
  }, [nav]);

  
  const submit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post("/listings", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      nav(`/listings/${res.data._id}`);
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data || err.message);
      alert("Failed to create listing");
    }
  };

  return (
  <div className="d-flex justify-content-center mt-5">
    <div className="glass-card" style={{ width: "400px" }}>
      <h3 className="text-center mb-3">Create Listing ✨</h3>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          className="input-modern mb-3 w-100"
          placeholder={key}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button className="btn-modern w-100" onClick={submit}>
        Create
      </button>
    </div>
  </div>
)};