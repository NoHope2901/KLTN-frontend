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

  useEffect(() => {
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
        console.error("Failed to fetch registered thesis", error);
      }
    };

    fetchRegisteredThesis();
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
            <td>{thesis.code}</td>
            <td>{thesis.instructor}</td>
            <td>{thesis.phoneNumber}</td>
            <td>{thesis.thesisName}</td>
            <td>{thesis.members.length + "/" + thesis.studentQuantity}</td>
            <td>{thesis.require}</td>
            <td>
              {role === "student" ? (
                registeredThesisId === thesis._id ? (
                  <button onClick={() => handleUnregisterTopic(thesis._id)}>Hủy</button>
                ) : (
                  <button
                    onClick={() => handleRegisterTopic(thesis._id)}
                    disabled={!!registeredThesisId || thesis.members.length >= thesis.studentQuantity}
                  >
                    Đăng ký
                  </button>
                )
              ) : (
                <>
                  <button onClick={() => handleDeleteTopic(thesis._id)}>Xóa</button>
                  <button
                    onClick={() => {
                      setEditThesisId(thesis._id);
                      setShowForm(true);
                    }}
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
