// hội đồng
import React, { useEffect, useState } from "react";
import CouncilTable from "../components/CouncilTable/CouncilTable";

const Council = () => {
  const [data, setData] = useState([]);
  const name = localStorage.getItem("fullname");

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/status/getlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        alert("co loi xay ra");
      }
      const listData = await response.json();
      setData(listData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <CouncilTable data={data} name={name} />
      </div>
    </>
  );
};

export default Council;
