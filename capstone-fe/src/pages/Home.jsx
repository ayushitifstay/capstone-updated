import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/global.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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
    <div className="container">
      <h2>Listings</h2>

      <input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No listings found</p>
      ) : (
        filtered.map(i => (
          <div className="list-card" key={i._id}>
            <h3 className="list-title">{i.title}</h3>
            <p className="list-location">{i.location}</p>
            <Link to={`/listings/${i._id}`}>View</Link>
          </div>
        ))
      )}
    </div>
  );
}