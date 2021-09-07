import React, { useContext, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import { RavitaillementContext } from "../../context/RavitaillementVehiculeContext";
import { ExportExcel } from "../../utils/ExportExcel";
function RavitaillementList() {
  const { ravitaillements } = useContext(RavitaillementContext);

  const {
    logging,
    findKey,
    currentPage,
    nombrePerPage,
    search,
    paginate,
    setFindKey,
  } = useContext(TableListContext);
  useEffect(() => {
    setFindKey("");
    paginate(1);
  }, []);
  let i = 0;
  return (
    <>
      <div className="tabs mb-1 px-3 ">
        <ul className="nav nav-tabs">
          <li className="nav-item ">
            <a className="nav-link active " data-target="#ravitaillements">
              Ravitaillements
            </a>
          </li>
        </ul>
      </div>
      <div
        className="row d-flex flex-column-reverse flex-sm-wrap "
        id="ravitaillements"
      >
        <div className="col mb-2">
          <div className="panel card">
            <div className="card-body">
              <div className="card-title">
                <Search findKey={findKey} setFindKey={setFindKey} />
                <h6 className="mt-2">
                  <span>Ravitaillements</span>
                  <small className="px-1">Details</small>
                </h6>
              </div>
              <div className="table">
                <div className="table-responsive-sm table-sm mt-1">
                  <table className="table table-bordered table-striped ">
                    <thead className="thead-light">
                      <tr>
                        <th className="align-middle text-center">N°</th>
                        <th className="align-middle text-center">DATE </th>
                        <th className="align-middle text-center">NOM CUVE</th>
                        <th className="align-middle text-center">
                          Quantité Cuve
                        </th>
                        <th className="align-middle text-center">
                          Quantité RAVITAILLEE
                        </th>
                        <th className="align-middle text-center">
                          IMMATRICULE
                        </th>
                        <th className="align-middle text-center">CATEGORIE</th>
                        <th className="align-middle text-center">
                          KILOMETRAGE
                        </th>
                        {/* <th className="temiddleter">DIST.PARCOURUE</th> */}
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
                        search(ravitaillements)
                          .slice(
                            currentPage * nombrePerPage - nombrePerPage,
                            currentPage * nombrePerPage
                          )
                          .map((ravitaillement) => (
                            <tr key={ravitaillement.id}>
                              <td className="align-middle text-center">
                                {(i = i + 1)}
                              </td>

                              <td className="align-middle text-center">
                                {ravitaillement.dateRavitaillement}
                              </td>
                              <td className="align-middle text-center">
                                {ravitaillement.cuveName}
                              </td>
                              <td className="text-center align-middle">
                                {ravitaillement.quantityCurrentCuve}
                              </td>
                              <td className="text-center align-middle">
                                {ravitaillement.quantityRavitaillement}
                              </td>

                              <td className="align-middle text-center">
                                {ravitaillement.immatricule}
                              </td>
                              <td className="align-middle text-center">
                                {ravitaillement.categorie}
                              </td>
                              <td className="align-middle text-center">
                                {ravitaillement.kilometrageCurrent}
                              </td>
                              {/* <td className="text-nowrap align-middle">
                                {ravitaillement.distanceParcourue}
                              </td> */}
                              <td className="align-middle text-center">
                                {ravitaillement.chauffeur}
                              </td>

                              <td className="text-nowrap align-middle">
                                <Link
                                  className="my-link"
                                  to={{
                                    pathname: "/ravitaillement/edit",
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
                <Pagination
                  nombreTotal={search(ravitaillements).length}
                  nombrePerPage={nombrePerPage}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col mb-1">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/ravitaillement/add" }}
                >
                  <button className="btn btn-success shadow-none ">
                    Ravitailler
                  </button>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/ravitaillement/soutire" }}
                >
                  <button className="btn btn-danger shadow-none ">
                    Soutirer
                  </button>
                </Link>
                {/* <ExportExcel
                  csvData={ravitaillements}
                  fileName={"RapportRavitaillement"}
                /> */}
                {/* <button className="btn btn-success">
                  <a
                    className="text-white"
                    style={{ textDecoration: "none" }}
                    href={
                      "http://localhost:8080/operationsCuve/getReportAllOperationsCuveOrderByDate?title=juin&format=pdf"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <i className="fa fa-fw fa-upload"></i> PDF
                  </a>
                </button> */}
              </div>
              {/* <div className="mt-3">
                <div className="form-group ">
                  <Search findKey={findKey} setFindKey={setFindKey} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RavitaillementList;
