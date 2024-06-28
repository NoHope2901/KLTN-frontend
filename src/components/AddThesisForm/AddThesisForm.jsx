// src/components/AddThesisForm.jsx
import React, { useState, useEffect } from "react";
import "./AddThesisForm.css";

const AddThesisForm = ({ onClose, fetchTheses }) => {
  const [formData, setFormData] = useState({
    thesisName: "",
    instructor: "",
    studentQuantity: 1,
    require: "",
  });

  useEffect(() => {
    const code = localStorage.getItem("code");
    const fullname = localStorage.getItem("fullname");
    const instructorName = code && fullname ? `${code} - ${fullname}` : "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      instructor: instructorName,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "studentQuantity" ? parseInt(value, 10) : value,
    }));
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/theses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchTheses();
        onClose();
      } else {
        const errorText = await response.text();
        console.error("Failed to add thesis", errorText);
      }
    } catch (error) {
      console.error("Failed to add thesis", error);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Thêm Đề Tài</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            name="thesisName"
            placeholder="Tên đề tài"
            value={formData.thesisName}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            name="instructor"
            placeholder="Người hướng dẫn"
            value={formData.instructor}
            readOnly
          />
          <input
            required
            type="number"
            name="studentQuantity"
            placeholder="Số lượng"
            value={formData.studentQuantity}
            onChange={handleChange}
          />
          <input
            required
            type="text"
            name="require"
            placeholder="Yêu cầu"
            value={formData.require}
            onChange={handleChange}
          />
          <button type="submit">Xong</button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddThesisForm;
