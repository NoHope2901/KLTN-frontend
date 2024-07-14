import React from "react";
import "./CouncilTable.css";
import SelectTwoOption from "../SelectTwoOption/SelectTwoOption";

const CouncilTable = ({ data, name }) => {
  const checkRoleInCouncil = (record, name) => {
    if (record.president === name) return "Chủ Tịch";
    if (record.counterArgument === name) return "Phản Biện";
    if (record.secretary === name) return "Thư Ký";
    if (record.commissioner === name) return "Ủy Viên";
  };

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
      <table className="council-table">
        <thead>
          <tr>
            <th>Vai Trò</th>
            <th>Sinh Viên</th>
            <th>Link Tài Liệu Của Sinh Viên</th>
            <th>Link Sản Phẩm Của Sinh Viên</th>
            <th>Điểm</th>
            <th>Cho Phép Bảo Vệ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dt) => (
            <tr>
              <td>{checkRoleInCouncil(dt, name)}</td>
              <td>{dt.studentCode}</td>
              <td>http://dsfkdsfjsdfjl;jk.sdflksdfsdkf</td>
              <td>http://dsfkdsfjsdfjl;jk.sdflksdfsdkf</td>
              <td>{dt.score}</td>
              <td>
                <SelectTwoOption
                  onChange={(value) => handleSelectChange(value, "allowProtect")}
                  value={dt.studentCode + " " + dt.allowProtect}
                  msv={dt.studentCode}
                  option={{ op1: "Không", op2: "Có" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CouncilTable;
