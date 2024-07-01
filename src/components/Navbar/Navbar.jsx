import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token")

  // Kiểm tra nếu đường dẫn là /login thì không render Navbar
  if (location.pathname === "/login") {
    return null;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("code");
    localStorage.removeItem("fullname");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <ul className="nav-menu">
        <li>
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/notifications">
            Notifications
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/theses">
            Theses
          </Link>
        </li>
        {role === "admin" && (
          <li>
            <Link style={{ textDecoration: "none" }} to="/admin">
              Admin
            </Link>
          </li>
        )}
      </ul>
      <div className="nav-logout">
        <Link to="/login">
          <button onClick={handleLogout}>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
