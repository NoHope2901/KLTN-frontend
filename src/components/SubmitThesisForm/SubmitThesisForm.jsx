import React, { useState } from "react";

const SubmitThesisForm = () => {
  const [formData, setFormData] = useState({
    linkDrive: "",
    linkGithub: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Failed to submit");
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2>Nộp link bài tập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              required
              name="linkDrive"
              placeholder="Link Drive"
              value={formData.linkDrive}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              name="linkGithub"
              placeholder="Link Github"
              value={formData.linkGithub}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Nộp Bài</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitThesisForm;
