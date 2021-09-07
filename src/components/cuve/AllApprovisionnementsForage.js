import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";
import ReactPaginate from "react-paginate";
import { RavitaillementContext } from "../../context/RavitaillementVehiculeContext";
import MenuCuveMobile from "./MenuCuveMobile";
import { RavitaillementForageContext } from "../../context/RavitaillementForageContext";
function AllApprovisionnementsForage() {
  const { ravitaillementForages } = useContext(RavitaillementForageContext);
  const { logging, findKey, search, setFindKey } = useContext(TableListContext);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });
  useEffect(() => {
    console.log("in all ravitaillementForages");
    console.log("les ravitaillementForages", ravitaillementForages);

    const newData = search([...ravitaillementForages]);
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
    ravitaillementForages,
    search,
  ]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };
  let i = 0;
  return (
    <div className="row w-100 mx-0">
      <MenuCuveMobile />
      <div className="col col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#stations">
                Ravitailements Forages
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2 ">
          <Link to="/cuve" className="my-link p-2">
            <i className="fa fa-arrow-left mr-1"></i>
            Retour Liste
          </Link>
          <div className=" card-body">
            <div className=" card-title">
              <Search findKey={findKey} setFindKey={setFindKey} />
              {/* <h6 className="mt-2">Ravitaillements Véhicules</h6> */}
            </div>
            <div className="table text-sm">
              <div className="table-responsive table-sm ">
                <table className="table table-bordered table-striped ">
                  <thead className="thead-light">
                    <tr>
                      <th className="align-middle text-center">N°</th>
                      <th className="align-middle text-center">DATE HEURE </th>
                      <th className="align-middle text-center">FORAGE</th>
                      <th className="align-middle text-center">CUVE MOBILE </th>
                      <th className="align-middle text-center">Qté DEPOSEE</th>
                      <th className="align-middle text-center">Qté EN STOCK</th>
                      <th className="align-middle text-center">CONDUCTEUR</th>
                      <th className="align-middle text-center">ACTIONS </th>
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
                          <td className="align-middle text-center">
                            {(i = i + 1)}
                          </td>

                          <td className="align-middle text-center">
                            {ravitaillement.dateApprov}
                          </td>
                          <td className="align-middle text-center">
                            {ravitaillement.nomForage}
                          </td>
                          <td className="text-center align-middle">
                            {ravitaillement.cuveName}
                          </td>
                          <td className="text-center align-middle">
                            {ravitaillement.quantiteApprov}
                          </td>

                          <td className="align-middle text-center">
                            {ravitaillement.quantiteStock}
                          </td>
                          <td className="align-middle text-center">
                            {ravitaillement.nomConducteur}
                          </td>

                          <td className="text-nowrap align-middle">
                            <Link
                              className="my-link"
                              to={{
                                pathname: "/cuve/edit-ravitaillement-forage",
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

export default AllApprovisionnementsForage;
