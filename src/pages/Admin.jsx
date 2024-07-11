// src/pages/Admin.jsx
import React from "react";
import "./CSS/Admin.css";
import DeadlineForm from "../components/DeadlineForm/DeadlineForm.jsx";
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
        const data = await response.json();
        alert("Deadline created successfully!");
        console.log("New Deadline:", data);
      } else {
        const errorText = await response.text();
        alert(`Failed to create deadline: ${errorText}`);
      }
    } catch (error) {
      console.error("Failed to create deadline", error);
      alert("Error creating deadline. Please try again.");
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
