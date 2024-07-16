// hội đồng
import React, { useEffect, useState } from "react";
import CouncilTable from "../components/CouncilTable/CouncilTable";
import { Header } from "../constans";

const Council = () => {
  const [data, setData] = useState([]);
  const name = localStorage.getItem("fullname");
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/status/getlist`, {
        method: "GET",
        headers: Header(token),
      });
      if (!response.ok) {
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
