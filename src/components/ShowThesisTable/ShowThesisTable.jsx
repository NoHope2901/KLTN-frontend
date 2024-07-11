// src/components/ThesisTable.jsx
import React, { useState } from "react";
import "./ShowThesisTable.css";
import Pagination from "../Pagination/Pagination";

const ShowThesisTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const end = currentPage * itemsPerPage;
  const start = end - itemsPerPage;
  const renderData = data.slice(start, end);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
          </tr>
        </thead>
        <tbody>
          {renderData.map((dt, index) => (
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
      {!data.length ? (
        <div className="no-data">
          <i class="bx bx-folder-open"></i>Không có dữ liệu
        </div>
      ) : null}
      {data.length > 10 && (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ShowThesisTable;
