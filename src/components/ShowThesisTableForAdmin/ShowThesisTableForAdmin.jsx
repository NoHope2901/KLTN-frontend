import React, { useState } from "react";
import "./ShowThesisTableForAdmin.css";
import Pagination from "../Pagination/Pagination";
import SelectCouncil from "../SelectCouncil/SelectCouncil";

const ShowThesisTableForAdmin = ({ listTeacher, data, setData }) => {
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

  const handleSelectChange = async (value, role) => {
    try {
      const studentCode = value.slice(0, 6);
      const updateName = value.slice(7);
      const response = await fetch(`http://localhost:3001/status/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          role: role,
          studentCode,
          updateName,
        }),
      });
    } catch (error) {}
  };

  return (
    <>
      <table className="thesis-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>KỲ</th>
            <th>NĂM</th>
            <th>MSV</th>
            <th>HỌ ĐỆM</th>
            <th>TÊN</th>
            <th>NGÀY SINH</th>
            <th>LỚP</th>
            <th>SĐT</th>
            <th>ĐỀ TÀI</th>
            <th>GVHD</th>
            <th>CHỦ TỊCH</th>
            <th>PHẢN BIỆN</th>
            <th>THƯ KÝ</th>
            <th>ỦY VIÊN</th>
            <th>NGÀY</th>
            <th>ĐIỂM</th>
            <th>GIA HẠN</th>
            <th>TRẠNG THÁI</th>
            <th>ĐƯỢC PHÉP BẢO VỆ</th>
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
              <td>{dt.sdt}</td>
              <td>{dt.tdt}</td>
              <td>{dt.gvhd}</td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.ct}
                  onChange={(value) => handleSelectChange(value, "president")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.pb}
                  onChange={(value) => handleSelectChange(value, "counterArgument")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.tk}
                  onChange={(value) => handleSelectChange(value, "secretary")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.uv}
                  onChange={(value) => handleSelectChange(value, "commissioner")}
                  msv={dt.msv}
                />
              </td>
              <td>{dt.ng}</td>
              <td>{dt.d}</td>
              <td>{dt.gh}</td>
              <td>{dt.tt}</td>
              <td>CÓ</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length ? (
        <div className="no-data">
          <i className="bx bx-error-alt"></i>Không có dữ liệu
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

export default ShowThesisTableForAdmin;
