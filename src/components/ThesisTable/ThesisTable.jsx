// src/components/ThesisTable.jsx
import React, { useState, useEffect } from "react";
import "./ThesisTable.css";
import EditThesisForm from "../EditThesisForm/EditThesisForm";

const ThesisTable = ({ theses, fetchTheses }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // Lưu trữ ID của đề tài đã đăng ký
  const [registeredThesisId, setRegisteredThesisId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editThesisId, setEditThesisId] = useState("");
  const [isTeacherDeadlineActive, setIsTeacherDeadlineActive] = useState(true);
  const [isStudentDeadlineActive, setIsStudentDeadlineActive] = useState(true);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    const fetchRegisteredThesis = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/theses/registered",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.registeredThesisId) {
            setRegisteredThesisId(data.registeredThesisId);
          }
>>>>>>> 8201345f1c28830f0898bf566aa05f4a465e4d04
        }
      }
    } catch (error) {
      console.error("Failed to fetch registered thesis", error);
    }
  };

  const fetchTeacherDeadline = async () => {
    try {
      const response = await fetch("http://localhost:3001/deadlines/teacher", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setIsTeacherDeadlineActive(false);
      }
    } catch (error) {
      console.error("Failed to fetch deadline", error);
    }
  };
  const fetchStudentDeadline = async () => {
    try {
      const response = await fetch("http://localhost:3001/deadlines/student", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setIsStudentDeadlineActive(false);
      }
    } catch (error) {
      console.error("Failed to fetch deadline", error);
    }
  };
  useEffect(() => {
    fetchRegisteredThesis();
    fetchTeacherDeadline();
    fetchStudentDeadline();
  }, [token]);

  const handleRegisterTopic = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/theses/change/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setRegisteredThesisId(id);
      }
      fetchTheses();
    } catch (error) {
      console.error("Failed to register thesis", error);
    }
  };

  const handleUnregisterTopic = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/theses/change/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setRegisteredThesisId("");
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {theses.map((thesis, index) => (
          <tr key={thesis._id}>
            <td>{index + 1}</td>
            <td>{thesis.instructorName}</td>
            <td>{thesis.instructorCode}</td>
            <td>{thesis.instructorPhone}</td>
            <td>{thesis.thesisName}</td>
            <td>{thesis.members.length + "/" + thesis.studentQuantity}</td>
            <td>{thesis.require}</td>
            <td>
              {role === "student" ? (
                registeredThesisId === thesis._id ? (
<<<<<<< HEAD
                  <button onClick={() => handleUnregisterTopic(thesis._id)} disabled={!isStudentDeadlineActive}>
=======
                  <button onClick={() => handleUnregisterTopic(thesis._id)}>
>>>>>>> 8201345f1c28830f0898bf566aa05f4a465e4d04
                    Hủy
                  </button>
                ) : (
                  <button
                    onClick={() => handleRegisterTopic(thesis._id)}
                    disabled={
                      !!registeredThesisId ||
<<<<<<< HEAD
                      thesis.members.length >= thesis.studentQuantity ||
                      !isStudentDeadlineActive
                    }
                  >
=======
                      thesis.members.length >= thesis.studentQuantity
                    }>
>>>>>>> 8201345f1c28830f0898bf566aa05f4a465e4d04
                    Đăng ký
                  </button>
                )
              ) : (
                <>
<<<<<<< HEAD
                  <button disabled={!isTeacherDeadlineActive} onClick={() => handleDeleteTopic(thesis._id)}>
                    Xóa
                  </button>
                  <button
                    onClick={() => {
                      setEditThesisId(thesis._id);
                      setShowForm(true);
                    }}
                    disabled={!isTeacherDeadlineActive}
                  >
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
=======
                  <div>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteTopic(thesis._id)}>
                      Xóa
                    </button>
                    <button
                      onClick={() => {
                        setEditThesisId(thesis._id);
                        setShowForm(true);
                      }}>
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
                  </div>
>>>>>>> 8201345f1c28830f0898bf566aa05f4a465e4d04
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ThesisTable;
