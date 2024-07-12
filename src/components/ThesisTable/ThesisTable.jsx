// src/components/ThesisTable.jsx
import React, { useState, useEffect } from "react";
import "./ThesisTable.css";
import EditThesisForm from "../EditThesisForm/EditThesisForm";
import ModalAction from "../ModalAction/ModalAction";
import Pagination from "../Pagination/Pagination";

const ThesisTable = ({ theses, fetchTheses }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Lưu trữ ID của đề tài đã đăng ký
  const [registeredThesisId, setRegisteredThesisId] = useState("");
  const [showForm, setShowForm] = useState(false);
  // const [showModalDelete, setShowModalDelete] = useState(false);
  const [editThesisId, setEditThesisId] = useState("");
  const [isTeacherDeadlineActive, setIsTeacherDeadlineActive] = useState(false);
  const [isStudentDeadlineActive, setIsStudentDeadlineActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = theses.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(theses.length / itemsPerPage);

  const fetchRegisteredThesis = async () => {
    try {
      const response = await fetch("http://localhost:3001/theses/registered", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.registeredThesisId) {
          setRegisteredThesisId(data.registeredThesisId);
        }
      }
    } catch (error) {
      // console.error("Failed to fetch registered thesis", error);
    }
  };

  const fetchTeacherDeadline = async () => {
    try {
      const response = await fetch("http://localhost:3001/deadlines/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setIsTeacherDeadlineActive(true);
      } else {
        setIsTeacherDeadlineActive(false);
      }
    } catch (error) {
      // console.error("Failed to fetch deadline", error);
    }
  };
  const fetchStudentDeadline = async () => {
    try {
      const response = await fetch("http://localhost:3001/deadlines/student", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setIsStudentDeadlineActive(true);
      } else {
        setIsStudentDeadlineActive(false);
      }
    } catch (error) {
      // console.error("Failed to fetch deadline", error);
    }
  };

  useEffect(() => {
    fetchRegisteredThesis();
    fetchTeacherDeadline();
    fetchStudentDeadline();
  }, [token]);

  const handleRegisterTopic = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/theses/change/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setRegisteredThesisId(id);
      } else {
        alert("Thời hạn đăng ký đã hết hoặc chưa tới");
      }
      fetchTheses();
    } catch (error) {
      console.error("Failed to register thesis", error);
    }
  };

  const handleUnregisterTopic = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/theses/change/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setRegisteredThesisId("");
      } else {
        alert("Thời hạn đăng ký đã hết hoặc chưa tới");
      }
      fetchTheses();
    } catch (error) {
      console.error("Failed to unregister thesis", error);
    }
  };

  const handleDeleteTopic = async (id) => {
    try {
      await fetch(`http://localhost:3001/theses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTheses();
    } catch (error) {
      console.error("Failed to delete thesis", error);
    }
  };

  // const handleOpenModal = (id) => {
  //   setShowModalDelete(true);
  // };

  return (
    <>
      <table className="thesis-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>KỲ</th>
            <th>NĂM</th>
            <th>GVHD</th>
            <th>MÃ GV</th>
            <th>SĐT GV</th>
            <th>TÊN ĐỀ TÀI</th>
            <th>SỐ LƯỢNG</th>
            <th>YÊU CẦU</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((thesis, index) => (
            <tr key={thesis._id}>
              <td>{index + 1}</td>
              <td>{thesis.semester}</td>
              <td>{thesis.year}</td>
              <td>{thesis.instructorName}</td>
              <td>{thesis.instructorCode}</td>
              <td>{thesis.instructorPhone}</td>
              <td>{thesis.thesisName}</td>
              <td>{thesis.members.length + "/" + thesis.studentQuantity}</td>
              <td>{thesis.require}</td>
              <td>
                {role === "student" ? (
                  registeredThesisId === thesis._id ? (
                    <button
                      onClick={() => handleUnregisterTopic(thesis._id)}
                      // onClick={handleOpenModal(thesis._id)}
                      disabled={!isStudentDeadlineActive}
                    >
                      Hủy
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegisterTopic(thesis._id)}
                      disabled={
                        !!registeredThesisId ||
                        // thesis.members.length >= thesis.studentQuantity ||
                        !isStudentDeadlineActive
                      }
                    >
                      Đăng ký
                    </button>
                  )
                ) : role === "teacher" ? (
                  <p className="btn-action">
                    <button
                      disabled={!isTeacherDeadlineActive}
                      className="btn-delete"
                      onClick={() => handleDeleteTopic(thesis._id)}
                    >
                      <i class="bx bx-trash"></i>
                      Xóa
                    </button>
                    <button
                      style={{ marginLeft: "8px" }}
                      onClick={() => {
                        setEditThesisId(thesis._id);
                        setShowForm(true);
                      }}
                      disabled={!isTeacherDeadlineActive}
                    >
                      <i class="bx bx-pencil"></i>
                      Sửa
                    </button>
                    {showForm && editThesisId === thesis._id && (
                      <EditThesisForm
                        onClose={() => setShowForm(false)}
                        fetchTheses={fetchTheses}
                        id={thesis._id}
                        data={{
                          thesisName: thesis.thesisName,
                          instructor: thesis.instructor,
                          studentQuantity: thesis.studentQuantity,
                          require: thesis.require,
                        }}
                      />
                    )}
                  </p>
                ) : (
                  <p className="btn-action">
                    <button disabled={!isTeacherDeadlineActive}>
                      <i class="bx bx-trash"></i>
                      Xóa
                    </button>
                    <button style={{ marginLeft: "8px" }} disabled={!isTeacherDeadlineActive}>
                      <i class="bx bx-pencil"></i>
                      Sửa
                    </button>
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {theses.length > 10 && (
        <Pagination
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevPage={handlePrevPage}
        />
      )}
      {/* <ModalAction
        onClose={() => setShowModalDelete(true)}
        // handleDelete={handleUnregisterTopic(id)}
      /> */}
    </>
  );
};

export default ThesisTable;
