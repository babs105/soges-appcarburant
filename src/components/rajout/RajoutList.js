import React, { useContext, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";
function RajoutList() {
  const { rajouts } = useContext(RajoutContext);
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

  return (
    <div className="col">
      <div className="e-tabs mb-1 px-3 ">
        <ul className="nav nav-tabs">
          <li className="nav-item ">
            <a className="nav-link active " data-target="#stations">
              Approvisionnements Cuve
            </a>
          </li>
        </ul>
      </div>
      <div
        className="row d-flex flex-column-reverse flex-lg-row flex-md-wrap  flex-lg-nowrap"
        id="rajouts"
      >
        <div className="col mb-3">
          <div className="e-panel card">
            <div className="card-body">
              <div className="card-title">
                <h6 className="mr-2">
                  <span>Rajouts</span>
                  <small className="px-1">Details</small>
                </h6>
              </div>
              <div className="e-table">
                <div className="table-responsive table-lg mt-3">
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
                        search(rajouts)
                          .slice(
                            currentPage * nombrePerPage - nombrePerPage,
                            currentPage * nombrePerPage
                          )
                          .map((rajout) => (
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
                                    pathname: "/rajout/edit-rajout",
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
                <Pagination
                  nombreTotal={search(rajouts).length}
                  nombrePerPage={nombrePerPage}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="text-center px-xl-3">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: "/rajout/add-rajout" }}
                >
                  <button className="btn btn-success btn-block shadow-none">
                    Nouveau Rajout
                  </button>
                </Link>
              </div>
              <hr className="my-3" />
              <div className="e-navlist e-navlist--active-bold">
                <ul className="nav">
                  {/* <li className="nav-item active">
                    <a href="" className="nav-link">
                      <span>All</span> <small>/ 32</small>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <span>Active</span> <small>/ 16</small>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <span>Selected</span> <small>/ 0</small>
                    </a>
                  </li> */}
                </ul>
              </div>
              <hr className="my-3" />
              <div>
                {/* <div className="form-group">
              <label>Date from - to:</label>
              <div>
                <input
                  id="dates-range"
                  className="form-control flatpickr-input"
                  placeholder="01 May 21 - 27 May 21"
                  type="text"
                  readonly="readonly"
                />
              </div>
            </div> */}
                <div className="form-group">
                  <Search findKey={findKey} setFindKey={setFindKey} />
                </div>
              </div>
              <hr className="my-3" />
              <div className="">
                {/* <label>Status:</label> */}
                <div className="px-2">
                  {/* <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="user-status"
                      id="users-status-disabled"
                    />
                    <label
                      className="custom-control-label"
                      for="users-status-disabled"
                    >
                      Disabled
                    </label>
                  </div>
                </div>
                <div className="px-2">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="user-status"
                      id="users-status-active"
                    />
                    <label
                      className="custom-control-label"
                      for="users-status-active"
                    >
                      Active
                    </label>
                  </div>
                </div>
                <div className="px-2">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="user-status"
                      id="users-status-any"
                      checked=""
                    />
                    <label className="custom-control-label" for="users-status-any">
                      Any
                    </label>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RajoutList;
