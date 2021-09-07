import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";

import ReactPaginate from "react-paginate";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";
function AllRajoutCuvePrincipale() {
  const { rajouts } = useContext(CuvePrincipaleContext);
  const { logging, findKey, search, setFindKey } = useContext(TableListContext);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });
  useEffect(() => {
    console.log("in all rajouy cuve principale");
    console.log("les rajouts", rajouts);

    const newData = search([...rajouts]);
    console.log(" liste cuve principale", rajouts);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, rajouts, search]);

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
              <a className="nav-link active h6" data-target="#" href>
                Liste des Rajouts Cuves Principales
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2">
          <div className="d-flex h-10">
            <Link to="/cuve-principale" className="my-link p-2">
              <i className="fa fa-arrow-left mr-1"></i>
              Retour Liste
            </Link>
          </div>

          <div className="card-body ">
            <div className="card-title">
              <Search findKey={findKey} setFindKey={setFindKey} />
              <h6 className="mt-2">
                {/* <span>Approvisionnements Cuves Principales</span> */}
              </h6>
            </div>
            <div className="table">
              <div className="table-responsive table-sm">
                <table className="table table-bordered table-striped ">
                  <thead className="thead-light">
                    <tr>
                      <th>DATE</th>
                      <th>QUANTITE RAJOUT</th>
                      <th>CUVE</th>
                      <th>STATION</th>
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
                          <td className="text-nowrap align-middle">
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

export default AllRajoutCuvePrincipale;
