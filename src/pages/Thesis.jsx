// src/pages/ThesisPage.jsx
import React, { useState, useEffect } from "react";
import "./CSS/Thesis.css";
import AddThesisForm from "../components/AddThesisForm/AddThesisForm.jsx";
import ThesisTable from "../components/ThesisTable/ThesisTable.jsx";

const Thesis = () => {
  const [showForm, setShowForm] = useState(false);
  const [theses, setTheses] = useState([]);
  const [deadline, setDeadline] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
  const fetchDeadline = async () => {
    try {
      const response = await fetch("http://localhost:3001/deadlines", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setDeadline(formatDate(data.endDate));
    } catch (error) {
      console.error("Failed to fetch Deadline", error);
    }
  };

  useEffect(() => {
    fetchTheses();
    fetchDeadline();
  }, []);

  return (
    <div className="thesis-page">
      {role !== "student" && (
        <button className="add-thesis-btn" onClick={() => setShowForm(true)}>
          Thêm mới
        </button>
      )}
      <h2>Deadline: {deadline !== "Invalid Date" && deadline}</h2>
      {showForm && <AddThesisForm onClose={() => setShowForm(false)} fetchTheses={fetchTheses} />}
      <ThesisTable theses={theses} fetchTheses={fetchTheses} />
    </div>
  );
};

export default Thesis;
