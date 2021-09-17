import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import ExportExcelCP from "./ExportExcelCP";
import ExportExcelRaviCP from "./ExportExcelRaviCP";
function TableRaviCPResult({ rapportRaviCP, logging, search, title }) {
  const [exporData, setExportData] = useState([]);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    console.log("in all rajouy cuve principale");
    console.log("les rajouts", rapportRaviCP);

    const newData = search([...rapportRaviCP]);
    setExportData(newData);
    console.log(" liste cuve principale", rapportRaviCP);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, rapportRaviCP, search]);

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
        <ExportExcelRaviCP exporData={exporData} title={title} />
        <div className="table">
          <div className="table-responsive table-sm">
            <table className="table table-bordered table-striped ">
              <thead className="thead-light">
                <tr>
                  <th>DATE</th>
                  <th>CUVE PRINCIPALE</th>
                  <th>CUVE MOBILE</th>
                  <th>QUANTITE</th>
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
                  pagination.currentData.map((ravitaillement, index) => (
                    <tr key={ravitaillement.id}>
                      <td className="text-nowrap align-middle">
                        {ravitaillement.dateRavitaillementCuveMobile}
                      </td>
                      <td className="text-nowrap align-middle">
                        {ravitaillement.cuvePrincipale}
                      </td>
                      <td className="text-nowrap align-middle">
                        {ravitaillement.cuveMobile}
                      </td>

                      <td className="text-nowrap align-middle">
                        {ravitaillement.quantiteRavitaillee}
                      </td>
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

export default TableRaviCPResult;
