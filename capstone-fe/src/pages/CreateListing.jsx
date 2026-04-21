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

  // ✅ FIX 1: redirect properly using useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/login");
    }
  }, [nav]);

  // ✅ FIX 2: send token in request
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
    <div className="create-conatiner">
      <div className="create-box">
        <h2>Create Listing</h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
          />
        ))}

        <br />

        <button className="create-btn" onClick={submit}>
          Create
        </button>
      </div>
    </div>
  );
}