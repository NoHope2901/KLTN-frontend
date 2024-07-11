import React, { useEffect, useState } from "react";
import "./RegisteredStudent.css";
import RgtStudentItem from "../RgtStudentItem/RgtStudentItem";
import Pagination from "../Pagination/Pagination";

const RegisteredStudent = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDeleteStudent = async (id, memberId, index) => {
    try {
      let updatedData = [...data];

      updatedData[index].members = updatedData[index].members.filter(
        (mbId) => mbId !== memberId
      );

      setData(updatedData);

      await deleteStudentRequest(id, memberId);
    } catch (error) {
      console.error("Failed to delete student", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  const deleteStudentRequest = async (id, memberId) => {
    try {
      if (!token) {
        throw new Error("Token is missing. Please log in again.");
      }

      const response = await fetch(
        `http://localhost:3001/theses/deletemember/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deleteCode: memberId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete member. Please try again.");
      }
    } catch (error) {
      console.error("Failed to DELETE member", error);
    }
  };

  const fetchData = async () => {
    try {
      if (!token) {
        throw new Error("Token is missing. Please log in again.");
      }
      const response = await fetch(
        "http://localhost:3001/theses/getbyteachercode",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const receivedData = await response.json();

      setData(receivedData);
    } catch (error) {
      console.error("Failed to fetch theses", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <table className="rgt-student-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Đề Tài</th>
            <th className="width-70">Danh Sách Sinh Viên Đã Đăng Ký</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((thesis, index) => (
            <tr key={thesis._id}>
              <td>{index + 1}</td>
              <td>{thesis.thesisName}</td>
              <td className="width-70">
                {thesis.members.map((memberId) => (
                  <RgtStudentItem
                    key={memberId} // Thêm key cho mỗi item
                    index={index}
                    studentCode={memberId}
                    id={thesis._id}
                    handleDeleteStudent={handleDeleteStudent}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 10 && (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        // <div className="pagination">
        //   <button onClick={handlePrevPage} disabled={currentPage === 1}>
        //     Trang trước
        //   </button>
        //   <span>
        //     Trang {currentPage} / {totalPages}
        //   </span>
        //   <button
        //     onClick={handleNextPage}
        //     disabled={currentPage === totalPages}>
        //     Trang sau
        //   </button>
        // </div>
      )}
    </>
  );
};

export default RegisteredStudent;
