import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/detail.css";
import "../styles/global.css";

function ListingDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    api.get(`/listings/${id}`).then((res) => setListing(res.data));
  }, [id]);

  
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deleted successfully");
      nav("/");
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
  <div className="d-flex justify-content-center mt-5">
    <div className="glass-card" style={{ width: "400px" }}>
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>

      <p><strong>Meal:</strong> {listing.mealType}</p>
      <p><strong>Price:</strong> ₹{listing.pricePerDay}</p>
      <p><strong>Location:</strong> {listing.location}</p>

      <button
        className="btn-danger-modern w-100"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </div>
)};
export default ListingDetail;