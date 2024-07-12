import React from "react";
import "./CouncilTable.css";

const CouncilTable = () => {
  return (
    <>
      <table className="council-table">
        <thead>
          <tr>
            <th>Vai Trò</th>
            <th>Sinh Viên</th>
            <th>Link Tài Liệu Của Sinh Viên</th>
            <th>Link Sản Phẩm Của Sinh Viên</th>
            <th className="width-20">Cho Phép Bảo Vệ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phản biện</td>
            <td>A39393</td>
            <td>http://dsfkdsfjsdfjl;jk.sdflksdfsdkf</td>
            <td>http://dsfkdsfjsdfjl;jk.sdflksdfsdkf</td>
            <td>Có</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CouncilTable;
