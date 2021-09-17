import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import ExportExcelCP from "./ExportExcelCP";
function TableRajoutCPResult({ rapportCP, logging, search, title }) {
  const [exporData, setExportData] = useState([]);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    console.log("in all ravi cuve principale");
    console.log("les ravi", rapportCP);

    const newData = search([...rapportCP]);
    setExportData(newData);
    console.log(" liste cuve principale", rapportCP);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, rapportCP, search]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };
  return (
    <div className="card mt-2">
      <div className="card-body">
        <div className="card-title text-center h6 font-weight-bold">
          {title}
        </div>
        <ExportExcelCP exporData={exporData} title={title} />
        <div className="table">
          <div className="table-responsive table-sm">
            <table className="table table-bordered table-striped ">
              <thead className="thead-light">
                <tr>
                  <th>DATE</th>
                  <th>QUANTITE RAJOUT</th>
                  <th>CUVE</th>
                  <th>STATION</th>
                  {/* <th>ACTIONS</th> */}
                </tr>
              </thead>
              <tbody>
                {logging ? (
                  <tr className="">
                    <td className="text-center" colSpan="6">
                      <div className=" spinner-border text-success "></div>
                      <span className="sr-only">Loading...</span>
                    </td>
                  </tr>
                ) : (
                  pagination.currentData &&
                  pagination.currentData.map((rajout, index) => (
                    <tr key={rajout.id}>
                      <td className="text-nowrap align-middle">
                        {rajout.dateRajout}
                      </td>
                      <td className="text-nowrap align-middle">
                        {rajout.qteRajout}
                      </td>
                      <td className="text-nowrap align-middle">
                        {rajout.cuvePrincipale}
                      </td>
                      <td className="text-nowrap align-middle">
                        {rajout.station}
                      </td>
                      {/* <td className="text-nowrap align-middle">
                        <Link
                          className="my-link"
                          to={{
                            pathname: "/cuve-principale/edit-appoints",
                            state: rajout,
                          }}
                        >
                          <i
                            className="fa fa-fw fa-pencil"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </Link>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="">
            <ReactPaginate
              previousLabel={"Précedent "}
              nextLabel={"Suivant"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pagination.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"cp-pagination"}
              subContainerClassName={"pages cp-pagination"}
              activeClassName={"cp-active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableRajoutCPResult;
