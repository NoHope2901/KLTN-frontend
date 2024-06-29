// src/components/ThesisTable.jsx
import React from "react";
import "./ShowThesisTable.css";

const ShowThesisTable = ({ theses }) => {
  return (
    <table className="thesis-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Kỳ</th>
          <th>Năm</th>
          <th>MÃ sv</th>
          <th>Họ Đệm</th>
          <th>TÊN</th>
          <th>Ngày Sinh</th>
          <th>Lớp</th>
          <th>SĐT</th>
          <th>Đề Tài</th>
          <th>GVHD</th>
          <th>Chủ Tịch</th>
          <th>Phản Biện</th>
          <th>Ngày</th>
          <th>Điểm</th>
          <th>Gia Hạn</th>
          <th>Trạng Thái</th>

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

export default ShowThesisTable;
