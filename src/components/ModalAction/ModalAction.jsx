// src/components/AddThesisForm.jsx
import React from "react";

const ModalAction = ({ onClose, handleDelete }) => {
  return (
    <>
      <div className="form-overlay">
        <div className="form-container">
          <h2 className="modal-title">Bạn có chắc chắn xoá hay không ?</h2>
          <div className="form-button">
            <button onClick={onClose}>Huỷ</button>
            <button className="btn-delete" onClick={handleDelete}>
              <i class="bx bx-trash"></i>
              Xoá
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAction;
