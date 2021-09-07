import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import ReactPaginate from "react-paginate";
import { UserContext } from "../../context/UserContext";
import { ForageContext } from "../../context/ForageContext";
import MenuForage from "./MenuForage";

function ForageList() {
  const { forages } = useContext(ForageContext);
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
    const newData = search([...forages]);
    console.log(" forages", forages);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, forages, search]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  return (
    <div className="row w-100 mx-0">
      <MenuForage />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a
                className="nav-link active h6 text-center"
                data-target="#stations"
                href
              >
                Liste Forages
              </a>
            </li>
          </ul>
        </div>

        <div className=" card mt-2">
          <div className="card-body">
            <div className="card-title">
              <Search findKey={findKey} setFindKey={setFindKey} />
            </div>
            <div className="">
              <div className="table-responsive table-sm ">
                <table className="table table-bordered table-striped ">
                  <thead className="thead-light">
                    <tr className="text-sm">
                      <th className="align-middle text-center ">FORAGE</th>
                      <th className="align-middle text-center">
                        QUANTITE STOCK
                      </th>
                      <th className=" align-middle text-center ">ACTIONS</th>
                      <th
                        style={{ width: "5%" }}
                        className="text-center  text-wrap"
                      >
                        ALERTE
                      </th>
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
                      pagination.currentData.map((forage, index) => (
                        <tr key={forage.nomForage} className="">
                          <td className="align-middle text-center ">
                            {forage.nomForage}
                          </td>
                          <td className=" align-middle text-center font-weight-bold ">
                            {forage.quantiteStock}
                          </td>

                          <td className=" align-middle text-center text-nowrap">
                            <div class="dropdown">
                              <span
                                style={{ cursor: "pointer" }}
                                class="text-success border px-2 border-success dropdown-toggle "
                                id="dropdownMenu2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {/* Opérations */}
                              </span>
                              <div
                                class="dropdown-menu text-center"
                                aria-labelledby="dropdownMenu2"
                              >
                                {user.role === "Admin" && (
                                  <Link
                                    className="dropdown-item my-link"
                                    to={{
                                      pathname: "/forage/edit-forage",
                                      state: forage,
                                    }}
                                  >
                                    Editer Forage
                                  </Link>
                                )}
                                <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "",
                                    state: forage,
                                  }}
                                >
                                  Approvisionner Forage
                                </Link>
                                <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "/forage/ravitailler-groupe",
                                    state: forage,
                                  }}
                                >
                                  Ravitailler Groupe
                                </Link>
                              </div>
                            </div>
                          </td>

                          {`${forage.quantiteStock} ` < 100 ? (
                            <td
                              className=" text-danger text-center"
                              style={{ width: "5%" }}
                            >
                              <i
                                style={{ fontSize: 36 }}
                                className="fa fa-bell"
                              ></i>
                            </td>
                          ) : (
                            <td className="  " style={{ width: "5%" }}>
                              {" "}
                            </td>
                          )}
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

export default ForageList;
