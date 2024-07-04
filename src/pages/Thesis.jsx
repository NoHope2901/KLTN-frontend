// src/pages/ThesisPage.jsx
import React, { useState, useEffect } from "react";
import "./CSS/Thesis.css";
import AddThesisForm from "../components/AddThesisForm/AddThesisForm.jsx";
import ThesisTable from "../components/ThesisTable/ThesisTable.jsx";

const Thesis = () => {
  const [showForm, setShowForm] = useState(false);
  const [theses, setTheses] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const fetchTheses = async () => {
    try {
      const response = await fetch("http://localhost:3001/theses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTheses(data);
    } catch (error) {
      console.error("Failed to fetch theses", error);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  return (
    <>
    <div className="thesis-page">
      {role !== "student" || role !== "admin"  && (
        <button className="add-thesis-btn" onClick={() => setShowForm(true)}>
          Thêm mới
        </button>
      )}
      {showForm && <AddThesisForm onClose={() => setShowForm(false)} fetchTheses={fetchTheses} />}
      <ThesisTable theses={theses} fetchTheses={fetchTheses} />
    </div>
    </>
  );
};

export default Thesis;
