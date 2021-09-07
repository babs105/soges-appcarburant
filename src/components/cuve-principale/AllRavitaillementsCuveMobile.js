import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";

import ReactPaginate from "react-paginate";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";
function AllRavitaillementsCuveMobile() {
  const { ravitaillementsCuveMobile } = useContext(CuvePrincipaleContext);
  const {
    logging,
    findKey,
    currentPage,
    nombrePerPage,
    search,
    paginate,
    setFindKey,
  } = useContext(TableListContext);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });
  useEffect(() => {
    console.log("in all ravitaillementsCuveMobile");
    console.log("les ravitaillementsCuveMobile", ravitaillementsCuveMobile);

    const newData = search([...ravitaillementsCuveMobile]);
    console.log(" les ravitaillements", ravitaillementsCuveMobile);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [
    pagination.numberPerPage,
    pagination.offset,
    ravitaillementsCuveMobile,
    search,
  ]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuvePrincipale />
      <div className="col col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#stations" href>
                Liste Ravitaillements Cuves Mobiles
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2 ">
          <Link to="/cuve-principale" className="my-link p-2">
            <i className="fa fa-arrow-left mr-1"></i>
            Retour Liste
          </Link>
          <div className="card-body">
            <div className="card-title ">
              <Search findKey={findKey} setFindKey={setFindKey} />
            </div>
            <div className="e-table">
              <div className="table-responsive table-sm mt-3">
                <table className="table table-bordered table-striped ">
                  <thead className="thead-light">
                    <tr>
                      <th>DATE</th>
                      <th>CUVE PRINCIPALE</th>
                      <th>CUVE MOBILE</th>
                      <th>QUANTITE</th>
                      <th>ACTIONS</th>
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

                          <td className="text-nowrap align-middle">
                            <Link
                              className="my-link"
                              to={{
                                pathname:
                                  "/cuve-principale/edit-ravitaillements-cuve-mobile",
                                state: ravitaillement,
                              }}
                            >
                              <i
                                className="fa fa-fw fa-pencil"
                                style={{ cursor: "pointer" }}
                              ></i>
                            </Link>
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
      </div>
    </div>
  );
}

export default AllRavitaillementsCuveMobile;
