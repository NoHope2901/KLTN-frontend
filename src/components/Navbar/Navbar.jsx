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
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="logo">
              <img src={require("../images/Dai-hoc-thang-long.png")} alt="" />
            </div>
            <ul className="nav-menu">
              <li>
                <NavLink
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                  to="/">
                  <i class="bx bx-home"></i>
                  Home
                </NavLink>
              </li>
              {role !== "admin" && (
                <li>
                  <NavLink
                    activeClassName="active"
                    style={{ textDecoration: "none" }}
                    to="/notifications">
                    <i class="bx bx-bell-minus"></i>
                    Notifications
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  activeClassName="active"
                  style={{ textDecoration: "none" }}
                  to="/theses">
                  <i class="bx bx-group"></i>
                  Theses
                </NavLink>
              </li>
              {role === "admin" && (
                <li>
                  <NavLink
                    activeClassName="active"
                    style={{ textDecoration: "none" }}
                    to="/admin">
                    <i class="bx bx-child"></i>
                    Admin
                  </NavLink>
                </li>
              )}
              {role === "teacher" && (
                <li>
                  <NavLink
                    activeClassName="active"
                    style={{ textDecoration: "none" }}
                    to="/teacher">
                    <i class="bx bxs-graduation"></i>
                    Teacher
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="nav-logout">
            <img src={require("../images/no-avt.png")} alt="" />
            {role !== "admin" && (
              <p>
                {localStorage.getItem("fullname")} -{" "}
                {localStorage.getItem("code")}
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
