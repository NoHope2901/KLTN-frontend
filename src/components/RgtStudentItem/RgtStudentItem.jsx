import React from "react";
import "./RgtStudentItem.css";

const RgtStudentItem = ({ index, studentCode, id, handleDeleteStudent }) => {
  return (
    <div className="student-item">
      <p>{studentCode}</p>
      <button
        className="delete-student-btn"
        onClick={() => handleDeleteStudent(id, studentCode, index)}>
        <i className="bx bx-trash"></i>
        Xoá
      </button>
    </div>
  );
};

export default RgtStudentItem;
