import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="header">
      
      <div className="header-logo">
        <Link to="/">Tifstay</Link>
      </div>

      
      <div className="header-links">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/create">Create Listing</Link>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;