// // src/pages/Homepage.jsx
// import React, { useEffect, useState } from "react";
// import ShowThesisTable from "../components/ShowThesisTable/ShowThesisTable";
// import ShowThesisTableForAdmin from "../components/ShowThesisTableForAdmin/ShowThesisTableForAdmin";
// const Home = () => {
//   const [data, setData] = useState([]);
//   const [listTeacher, setListTeacher] = useState([
//     {
//       name: "Ngo thi Thu",
//     },
//     {
//       name: "Tran van Dan",
//     },
//   ]);
//   const role = localStorage.getItem("role");

//   const fetchHomeData = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api");
//       const dataResponse = await response.json();

//       setData(dataResponse);
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     }
//   };

//   useEffect(() => {
//     fetchHomeData();
//   }, []);

//   return (
//     <>
//       <div className="page">
//         {role === "admin" ? (
//           <ShowThesisTableForAdmin listTeacher={listTeacher} data={data} />
//         ) : (
//           <ShowThesisTable data={data} />
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import ShowThesisTable from "../components/ShowThesisTable/ShowThesisTable";
import ShowThesisTableForAdmin from "../components/ShowThesisTableForAdmin/ShowThesisTableForAdmin";
import Loading from "../components/Loading";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listTeacher, setListTeacher] = useState([]);
  const role = localStorage.getItem("role");

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/api");
      const dataResponse = await response.json();
      setData(dataResponse);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };
  const getTeacherList = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/users/teacher");
      const dataResponse = await response.json();
      setListTeacher(dataResponse);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
    getTeacherList();
  }, []);

  return (
    <>
      <div className="page">
        {loading && <Loading />}

        {role === "admin" ? (
          <ShowThesisTableForAdmin
            listTeacher={listTeacher}
            data={data}
            setData={setData}
          />
        ) : (
          <ShowThesisTable data={data} />
        )}
      </div>
    </>
  );
};

export default Home;
