// src/pages/Admin.jsx
import React from "react";
import "./CSS/Admin.css";
import DeadlineForm from "../components/DeadlineForm/DeadlineForm.jsx";
import { toast } from "react-toastify";
const Admin = () => {
  const handleSubmit = async (newDeadline) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/deadlines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDeadline),
      });

      if (response.ok) {
        // const data = await response.json();
        toast.success("Đăng thành công");
      } else {
        const errorText = await response.text();
        toast.error(`Failed to create deadline: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to create deadline", error);
      toast.error("Error creating deadline. Please try again.");
    }
  };

  return (
    <>
      <div className="admin-page">
        <h2>Tạo deadline </h2>
        <div className="tool-setup">
          <DeadlineForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
};

export default Admin;
