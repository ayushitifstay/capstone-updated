import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/global.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    api.get("/listings")
      .then((res) => {
        console.log("API DATA:", res.data); 
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API ERROR:", err); 
        setLoading(false);
      });
  }, []);

  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
  <div className="container mt-5">
    <h2 className="text-center mb-4">Tiffin Listings 🍱</h2>

    {/* 🔍 Search */}
    <input
      className="input-modern w-100 mb-4"
      placeholder="Search listings..."
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* 📦 Listings */}
    {filtered.length === 0 ? (
      <p className="text-center">No listings found</p>
    ) : (
      <div className="row">
        {filtered.map((i) => (
          <div className="col-md-4 mb-4" key={i._id}>
            <div className="glass-card h-100 d-flex flex-column justify-content-between">
              
              <div>
                <h5 className="mb-2">{i.title}</h5>
                <p className="mb-2">{i.description}</p>

                <p className="mb-1">
                  <strong>Meal:</strong> {i.mealType}
                </p>

                <p className="mb-1">
                  <strong>Price:</strong> ₹{i.pricePerDay}
                </p>

                <p className="mb-3">
                  <strong>Location:</strong> {i.location}
                </p>
              </div>

              <button
                className="btn-modern w-100 mt-auto"
                onClick={() => nav(`/listings/${i._id}`)}
              >
                View Details
              </button>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)};