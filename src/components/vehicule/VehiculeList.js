import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import ReactPaginate from "react-paginate";
import { UserContext } from "../../context/UserContext";
import { VehiculeContext } from "../../context/VehiculeContext";
import MenuVehicule from "./MenuVehicule";

function VehiculeList() {
  const { vehicules } = useContext(VehiculeContext);
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
    const newData = search([...vehicules]);
    console.log(" forages", vehicules);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, vehicules, search]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  return (
    <div className="row w-100 mx-0">
      <MenuVehicule />
      <div className="col-12 col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a
                className="nav-link active h6 text-center"
                data-target="#stations"
                href
              >
                Liste Véhicules
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
                    <tr>
                      <th className="align-middle text-center">MATRICULE</th>
                      <th className="align-middle text-center">STATUT</th>
                      <th className="align-middle text-center">CATEGORIE</th>
                      <th className="align-middle text-center">KILOMETRAGE</th>
                      {/* <th>DATE</th> */}
                      <th className="align-middle text-center">ACTIONS</th>
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
                      pagination.currentData.map((vehicule, index) => (
                        <tr key={vehicule.id} className="">
                          <td className=" text-center text-nowrap align-middle">
                            {vehicule.immatricule}
                          </td>
                          <td className="  text-center text-nowrap align-middle">
                            {vehicule.statut}
                          </td>
                          <td className=" text-center text-nowrap align-middle">
                            {vehicule.categorie}
                          </td>
                          <td className=" text-center text-nowrap align-middle">
                            {vehicule.kilometrageCurrent}
                          </td>
                          <td className=" text-center text-nowrap">
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
                                      pathname: "/vehicule/edit-vehicule",
                                      state: vehicule,
                                    }}
                                  >
                                    Editer Véhicule
                                  </Link>
                                )}
                                {/* <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "",
                                    state: vehicule,
                                  }}
                                >
                                  Approvisionner Forage
                                </Link> */}
                                {/* <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "/forage/ravitailler-groupe",
                                    state: vehicule,
                                  }}
                                >
                                  Ravitailler Groupe
                                </Link> */}
                              </div>
                            </div>
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

export default VehiculeList;
