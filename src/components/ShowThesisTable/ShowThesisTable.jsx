// src/components/ThesisTable.jsx
import React from "react";
import "./ShowThesisTable.css";

const ShowThesisTable = ({ data }) => {
  const role = localStorage.getItem("role");
  return (
    <>
      <table className="thesis-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Kỳ</th>
            <th>Năm</th>
            <th>Mã sv</th>
            <th>Họ Đệm</th>
            <th>Tên</th>
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
          {data.map((dt, index) => (
            <tr key={dt._id}>
              <td>{index + 1}</td>
              <td>{dt.ky}</td>
              <td>{dt.nam}</td>
              <td>{dt.msv}</td>
              <td>{dt.hd}</td>
              <td>{dt.t}</td>
              <td>{dt.ns}</td>
              <td>{dt.lcn}</td>
              <td>{dt.ns}</td>
              <td>{dt.tdt}</td>
              <td>{dt.gvhd}</td>
              <td>{dt.ct}</td>
              <td>{dt.pb}</td>
              <td>{dt.ng}</td>
              <td>{dt.d}</td>
              <td>{dt.gh}</td>
              <td>{dt.tt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ShowThesisTable;
