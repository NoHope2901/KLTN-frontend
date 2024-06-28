import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Kiểm tra response từ server và xử lý kết quả
      if (response.ok) {
        // Đăng nhập thành công, lưu token vào localStorage hoặc Redux store
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("code", data.user.code);
        localStorage.setItem("fullname", data.user.firstName + " " + data.user.lastName);
        navigate("/");
      } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi từ server
        setError(data.msg || "Đăng nhập không thành công");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gọi API:", error);
      setError("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  return (
    <div className="container-lg">
      <div className="login-container">
        <h2>Đăng nhập</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Tên đăng nhập:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mật khẩu:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
