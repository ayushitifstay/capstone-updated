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

  // ✅ FIXED DELETE FUNCTION
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
    <div className="container detail-conatiner">
      <div className="detail-box">
        <h2>{listing.title}</h2>
        <p>{listing.description}</p>
        <p>Meal: {listing.mealType}</p>
        <p>Price: ₹{listing.pricePerDay}</p>
        <p>Location: {listing.location}</p>

        <button className="btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ListingDetail;