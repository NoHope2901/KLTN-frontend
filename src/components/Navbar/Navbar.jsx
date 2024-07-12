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
<<<<<<< HEAD
                <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/">
                  <i class="bx bx-home"></i>
                  Trang chủ
=======
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "none")}
                  style={{ textDecoration: "none" }}
                  to="/">
                  <i className="bx bx-home"></i>
                  Home
>>>>>>> 237e6c0ea1833ffa49e36b002f33d1950ebe0d56
                </NavLink>
              </li>
              {role !== "admin" && (
                <li>
<<<<<<< HEAD
                  <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/notifications">
                    <i class="bx bx-bell-minus"></i>
                    Thông báo
=======
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/notifications">
                    <i className="bx bx-bell-minus"></i>
                    Notifications
>>>>>>> 237e6c0ea1833ffa49e36b002f33d1950ebe0d56
                  </NavLink>
                </li>
              )}
              <li>
<<<<<<< HEAD
                <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/theses">
                  <i class="bx bx-book-open"></i>
                  Khóa luận
=======
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "none")}
                  style={{ textDecoration: "none" }}
                  to="/theses">
                  <i className="bx bx-group"></i>
                  Theses
>>>>>>> 237e6c0ea1833ffa49e36b002f33d1950ebe0d56
                </NavLink>
              </li>
              {role === "admin" && (
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/admin">
                    <i className="bx bx-child"></i>
                    Admin
                  </NavLink>
                </li>
              )}
              {role === "teacher" && (
                <li>
<<<<<<< HEAD
                  <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/teacher">
                    <i class="bx bxs-graduation"></i>
                    Giáo viên
                  </NavLink>
                </li>
              )}
              {role === "teacher" && (
                <li>
                  <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/council">
                    <i class="bx bxs-group"></i>
                    Hội Đồng BV
                  </NavLink>
                </li>
              )}
              {role === "student" && (
                <li>
                  <NavLink activeClassName="active" style={{ textDecoration: "none" }} to="/submit">
                    <i class="bx bx-upload"></i>
                    Nộp bài tập
=======
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "none")}
                    style={{ textDecoration: "none" }}
                    to="/teacher">
                    <i className="bx bxs-graduation"></i>
                    Teacher
>>>>>>> 237e6c0ea1833ffa49e36b002f33d1950ebe0d56
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
