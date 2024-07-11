import React from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token")

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
    <>
      <div className="navbar">
        <nav>
          <ul className="nav-menu">
            <li>
              <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/">
                Home
              </NavLink>
            </li>
            {role !== "admin" && (
              <li>
                <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/notifications">
                  Notifications
                </NavLink>
              </li>
            )}
            <li>
              <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/theses">
                Theses
              </NavLink>
            </li>
            {role === "admin" && (
              <li>
                <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
            {role === "teacher" && (
              <li>
                <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/teacher">
                  Teacher
                </NavLink>
              </li>
            )}
          </ul>
          <div className="nav-logout">
            <img src={require("../images/no-avt.png")} alt="" />
            {role !== "admin" && (
              <p>
                {localStorage.getItem("fullname")} - {localStorage.getItem("code")}
              </p>
            )}

            <Link to="/login">
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
