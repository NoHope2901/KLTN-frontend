import React from "react";

const Pagination = ({
  handlePrevPage,
  currentPage,
  totalPages,
  handleNextPage,
}) => {
  return (
    <>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <i class="bx bx-chevron-left"></i>
        </button>
        <span>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <i class="bx bx-chevron-right"></i>
        </button>
      </div>
    </>
  );
};

export default Pagination;
