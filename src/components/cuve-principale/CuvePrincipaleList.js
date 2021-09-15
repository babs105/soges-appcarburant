import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import ReactPaginate from "react-paginate";
import { UserContext } from "../../context/UserContext";
import { CuvePrincipaleContext } from "../../context/CuvePrincipaleContext";
import faker from "faker";
import { RajoutContext } from "../../context/RajoutContext";
import MenuCuvePrincipale from "./MenuCuvePrincipale";

function CuvePrincipaleList() {
  const { cuvesPrincipale } = useContext(CuvePrincipaleContext);
  const { user } = useContext(UserContext);
  //   const { rajouts } = useContext(RajoutContext);
  const { findKey, search, setFindKey, logging } = useContext(TableListContext);

  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  useEffect(() => {
    const newData = search([...cuvesPrincipale]);
    console.log(" liste cuve principale", cuvesPrincipale);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, cuvesPrincipale, search]);

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
              <a className="nav-link active h6" data-target="#stations" href>
                Liste Cuve Principale
              </a>
            </li>
          </ul>

          <div className="card mt-2">
            <div className="card-body">
              <div className="card-title">
                <Search findKey={findKey} setFindKey={setFindKey} />
                <h6 className="">
                  <small className="px-1"> Liste Cuves Principales</small>
                </h6>
              </div>
              <div className="">
                {/* <div className="table-responsive table-sm ">
                  <table className="table table-bordered table-striped ">
                    <thead className="thead-light">
                      <tr>
                        <th className="">CUVE PRINCIPALE</th>
                        <th>QUANTITE ACTUELLE (Litres)</th>
                        <th className="text-center">ACTIONS</th>
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
                        pagination.currentData.map((cuve, index) => (
                          <tr key={cuve.id}>
                            <td className="">{cuve.cuveName}</td>
                            <td className="font-weight-bold">
                              {cuve.quantiteActuelle}
                            </td>

                            <td className="text-nowrap text-center">
                              <div class="dropdown">
                                <span
                                  style={{ cursor: "pointer" }}
                                  class="text-primary p-2"
                                  id="dropdownMenu2"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="fa fa-2x fa-angle-down"> </i>
                                </span>
                                <div
                                  class="dropdown-menu text-center"
                                  aria-labelledby="dropdownMenu2"
                                >
                                  {user.role === "Admin" && (
                                    <Link
                                      className="dropdown-item my-link"
                                      to={{
                                        pathname: "/cuve-principale/edit",
                                        state: cuve,
                                      }}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Editer "
                                    >
                                      Modifier Cuve Principale
                                    </Link>
                                  )}
                                  <Link
                                    className="dropdown-item "
                                    style={{ textDecoration: "none" }}
                                    to={{
                                      pathname: "/cuve-principale/appoint",
                                      state: cuve,
                                    }}
                                  >
                                    Remplir Cuve Principale
                                  </Link>
                                  <Link
                                    className="dropdown-item "
                                    style={{ textDecoration: "none" }}
                                    to={{
                                      pathname:
                                        "/cuve-principale/ravitailler-cuve-mobile",
                                      state: cuve,
                                    }}
                                  >
                                    Ravitailler Cuve Mobile
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div> */}
                <div className="row">
                  {pagination.currentData &&
                    pagination.currentData.map((cuve, index) => (
                      <div key={cuve.id} className="col col-sm-4">
                        <div class="card mb-2 shadow ">
                          <div class="card-body bg-c-light ">
                            <span class="card-title h5">{cuve.cuveName}</span>
                            {user.role === "Admin" && (
                              <Link
                                className=" my-link float-right text-success"
                                to={{
                                  pathname: "/cuve-principale/edit",
                                  state: cuve,
                                }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Editer "
                              >
                                <i className="fa fa-edit"></i>
                              </Link>
                            )}
                            <h6 class="card-title">
                              {`${cuve.quantiteActuelle} L`}
                            </h6>
                            {/* <p class="card-text">Editer les rapports</p> */}
                            <div class="dropdown mt-5">
                              <span
                                style={{ cursor: "pointer" }}
                                class="text-success p-1 border rounded"
                                id="dropdownMenu2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Actions{" "}
                                <i
                                  className="fa fa-angle-down"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  {" "}
                                </i>
                              </span>
                              <div
                                class="dropdown-menu text-center"
                                aria-labelledby="dropdownMenu2"
                              >
                                {/* {user.role === "Admin" && (
                                  <Link
                                    className="dropdown-item my-link"
                                    to={{
                                      pathname: "/cuve-principale/edit",
                                      state: cuve,
                                    }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Editer "
                                  >
                                    Modifier Cuve Principale
                                  </Link>
                                )} */}
                                <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "/cuve-principale/appoint",
                                    state: cuve,
                                  }}
                                >
                                  Remplir Cuve Principale
                                </Link>
                                <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname:
                                      "/cuve-principale/ravitailler-cuve-mobile",
                                    state: cuve,
                                  }}
                                >
                                  Ravitailler Cuve Mobile
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-5">
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
    </div>
  );
}

export default CuvePrincipaleList;
