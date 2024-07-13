// import React from "react";

// const SelectCouncil = ({ listTeacher, onChange, value }) => {
//   const handleChange = (e) => {
//     // onChange(e.target.value);
//   };
//   return (
//     <select value={value} name="" id="">
//       <option value="0">chọn</option>

//       {listTeacher.map((teacher, index) => (
//         <option key={index + 1} value={teacher.name}>
//           {teacher.name}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default SelectCouncil;

import React from "react";

const SelectCouncil = ({ listTeacher, onChange, value, msv }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue={value}>
      {/* <option value="Chủ tịch">Chủ tịch</option>
      <option value="A37829 Nguyễn Thị Hằng">Thị Hằng</option>
      <option value="Thư ký">Thư ký</option>
      <option value="Ủy viên">Ủy viên</option>
      <option value="A37829 Ngô Trung Quốc">Trung Quốc</option> */}
      <option value={`${msv} Không`}>chọn</option>
      {listTeacher.map((teacher, index) => (
        <option key={index} value={`${msv} ${teacher.firstName} ${teacher.lastName}`}>
          {`${teacher.firstName} ${teacher.lastName}`}
        </option>
      ))}
    </select>
  );
};

export default SelectCouncil;
