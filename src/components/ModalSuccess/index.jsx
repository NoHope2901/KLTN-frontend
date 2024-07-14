import React from "react";
import "./index.css";
const ModalSuccess = ({ handleClose }) => {
  return (
    <>
      <div className="form-overlay">
        <div className="modal-notifi ">
          <h2 className="modal-title">Thành công</h2>
          <div className="center" style={{ marginBottom: "20px" }}>
            <p className="center success">
              <i class="bx bx-check"></i>
            </p>
          </div>
          <div className="form-button">
            <button onClick={handleClose}>Xong</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSuccess;
