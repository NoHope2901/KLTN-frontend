// src/components/DeadlineForm.jsx
import React, { useState } from "react";
import "./DeadlineForm.css";

const DeadlineForm = ({ onSubmit }) => {
  const [type, setType] = useState("teacherSubmitTopics");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDeadline = { type, description, startDate, endDate };
    onSubmit(newDeadline);
  };

  return (
    <form className="deadline-form" onSubmit={handleSubmit}>
      <h2>Create New Deadline</h2>

      <label htmlFor="type">Kiểu</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="teacherSubmitTopics">Giáo viên tạo đề tài mới</option>
        <option value="studentSubmitTopics">Sinh viên đăng ký đề tài</option>
      </select>

      <label htmlFor="description">Mô tả</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label htmlFor="startDate">Ngày bắt đầu</label>
      <input
        type="datetime-local"
        id="startDate"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />

      <label htmlFor="endDate">Ngày kết thúc</label>
      <input type="datetime-local" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />

      <button type="submit">Xong</button>
    </form>
  );
};

export default DeadlineForm;
