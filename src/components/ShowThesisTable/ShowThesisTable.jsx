// src/components/ThesisTable.jsx
import React from "react";
import "./ThesisTable.css";

const ThesisTable = ({ theses }) => {
  return (
    <table className="thesis-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>GVHD</th>
          <th>MÃ GV</th>
          <th>SĐT GV</th>
          <th>TÊN ĐỀ TÀI</th>
          <th>SỐ LƯỢNG</th>
          <th>YÊU CẦU</th>
          <th>MÃ SV</th>
          <th>HỌ ĐỆM</th>
          <th>TÊN</th>
          <th>LỚP CN</th>
          <th>SĐT LIÊN HỆ</th>
          <th>GHI CHÚ</th>

          {/* Thêm các cột khác */}
        </tr>
      </thead>
      <tbody>
        {theses.map((thesis, index) => (
          <tr key={thesis._id}>
            <td>{index + 1}</td>
            <td>{thesis.name}</td>
            <td>{thesis.instructor}</td>
            <td>{thesis.author}</td>
            <td>{thesis.thesisName}</td>
            <td>{thesis.studentQuantity}</td>
            <td>{thesis.require}</td>
            {/* Hiển thị các cột khác */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ThesisTable;
