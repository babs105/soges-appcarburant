import React from "react";
function Pagination({ nombrePerPage, nombreTotal, paginate, currentPage }) {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(nombreTotal / nombrePerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination mt-3 mb-0  " style={{ cursor: "pointer" }}>
        <li
          className="page-item page-link"
          onClick={() => {
            paginate(1);
          }}
        >
          {"<<"}
        </li>
        <li
          className="page-item page-link "
          onClick={() => {
            if (currentPage !== 1) {
              paginate(currentPage - 1);
            } else {
              paginate(1);
            }
          }}
        >
          {"<"}
        </li>
        {pageNumber.map((number) => (
          <li
            key={number}
            className={
              "page-item page-link  " +
              (currentPage === number ? " text-white bg-success" : " ")
            }
            onClick={() => {
              paginate(number);
            }}
          >
            {number}
          </li>
        ))}
        <li
          className=" page-item page-link "
          onClick={() => {
            if (currentPage === pageNumber.length) {
              paginate(pageNumber.length);
            } else {
              paginate(currentPage + 1);
            }
          }}
        >
          {">"}
        </li>
        <li
          className=" page-item page-link "
          onClick={() => {
            paginate(pageNumber.length);
            // setCurrentPage(pageNumber.length);
          }}
        >
          {">>"}
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
