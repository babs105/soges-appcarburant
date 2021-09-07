import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import ReactPaginate from "react-paginate";
import { RavitaillementGroupeContext } from "../../context/RavitaillementGroupeContext";
import MenuForage from "./MenuForage";
function AllRavitaillementGroupe() {
  const { ravitaillementGroupes } = useContext(RavitaillementGroupeContext);
  const { logging, findKey, search, setFindKey } = useContext(TableListContext);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });
  useEffect(() => {
    console.log("in all ravitaillementGroupes");
    console.log("les ravitaillementGroupes", ravitaillementGroupes);

    const newData = search([...ravitaillementGroupes]);
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
    ravitaillementGroupes,
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
      <MenuForage />
      <div className="col col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#stations" href>
                Ravitailements Groupes
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2 ">
          <Link to="/forage" className="my-link p-2">
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
                <table className="table table-hover table-bordered table-striped ">
                  <thead className="thead-light">
                    <tr>
                      <th className="align-middle text-center">DATE HEURE</th>
                      <th className="align-middle text-center">
                        FORAGE/GROUPE
                      </th>
                      <th className=" align-middle text-center">
                        QUANTITE RAVITAILLEE
                      </th>
                      <th className=" align-middle text-center">
                        QUANTITE STOCK
                      </th>
                      <th className=" align-middle text-center">
                        INDEX COMPTEUR
                      </th>
                      <th className="align-middle text-center">
                        COMPTEUR HORAIRE
                      </th>
                      <th className="align-middle text-center">
                        VOLUME POMPE (m3)
                      </th>
                      <th className="align-middle text-center">
                        TEMPS DE POMPAGE
                      </th>
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
                      pagination.currentData.map((ravitaillement, index) => (
                        <tr key={ravitaillement.id} className=" text-nowrap">
                          <td align="center">
                            {ravitaillement.dateRavitaillementGe}
                          </td>
                          <td align="center">{ravitaillement.nomGroupe}</td>
                          <td align="center">
                            {ravitaillement.quantiteRavitaillee}
                          </td>
                          {/* <td align="center">{row.quantityInitCuve}</td> */}
                          <td align="center">{ravitaillement.stockForage}</td>
                          <td align="center">{ravitaillement.indexCompteur}</td>
                          <td align="center">
                            {ravitaillement.compteurHoraire}
                          </td>
                          <td align="center">{ravitaillement.volumePompe}</td>
                          <td align="center">
                            {ravitaillement.tempsDepompage}
                          </td>

                          <td className="text-nowrap align-middle">
                            <Link
                              className="my-link"
                              to={{
                                pathname: "/forage/edit-ravitaillement-groupe",
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

export default AllRavitaillementGroupe;
