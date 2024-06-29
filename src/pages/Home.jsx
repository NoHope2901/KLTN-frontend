// src/pages/Homepage.jsx
import React, { useEffect, useState } from "react";
import "./Page.css";
import ShowThesisTable from "../components/ShowThesisTable/ShowThesisTable";
const Home = () => {
  const [theses, setTheses] = useState([]);
  // const role = localStorage.getItem("role");

  const fetchTheses = async () => {
    try {
      const response = await fetch("http://localhost:3001/theses");
      const data = await response.json();
      setTheses(data);
    } catch (error) {
      console.error("Failed to fetch theses", error);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  return (
    <div className="page">
      <ShowThesisTable theses={theses} fetchTheses={fetchTheses} />
    </div>
  );
};

export default Home;
