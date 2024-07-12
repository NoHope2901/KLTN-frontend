// src/pages/Homepage.jsx
import React, { useEffect, useState } from "react";
import ShowThesisTable from "../components/ShowThesisTable/ShowThesisTable";
const Home = () => {
  const [data, setData] = useState([]);
  // const role = localStorage.getItem("role");

  const fetchHomeData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api");
      const dataResponse = await response.json();

      setData(dataResponse);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <>
      <div className="page">
        <ShowThesisTable data={data} />
      </div>
    </>
  );
};

export default Home;
