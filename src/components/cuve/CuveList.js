import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import ReactPaginate from "react-paginate";
import { UserContext } from "../../context/UserContext";
import { CuveContext } from "../../context/CuveContext";
import MenuCuveMobile from "./MenuCuveMobile";

import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function CuveList() {
  const { cuves } = useContext(CuveContext);
  const { user } = useContext(UserContext);
  //   const { rajouts } = useContext(RajoutContext);
  const { findKey, search, setFindKey, logging } = useContext(TableListContext);

  const [exporData, setExportData] = useState([]);
  const [pagination, setPagination] = useState({
    data: [],
    offset: 0,
    numberPerPage: 10,
    pageCount: 0,
    currentData: [],
  });

  const DataSet = [
    {
      columns: [
        {
          title: " N°",
          style: {
            font: { sz: "18", bold: true, color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "eb1207" } },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              right: { style: "medium" },
              left: { style: "medium" },
            },
            alignment: { horizontal: "center" },
          },
          width: { wpx: 125 },
        },
        {
          title: "CUVE MOBILE",
          style: {
            font: { sz: "18", bold: true, color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "eb1207" } },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              right: { style: "medium" },
              left: { style: "medium" },
            },
            alignment: { horizontal: "center" },
          },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "QUANTITE ACTUELLE",
          style: {
            font: { sz: "18", bold: true, color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "eb1207" } },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              right: { style: "medium" },
              left: { style: "medium" },
            },
            alignment: { horizontal: "center" },
          },
          width: { wch: 30 },
        }, // width in characters
        // {
        //   title: "Confirmed",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 100 },
        // }, // width in pixels
        // {
        //   title: "Deaths",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 125 },
        // }, // width in pixels
        // {
        //   title: "Recovered",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 100 },
        // }, // width in pixels
        // {
        //   title: "Active",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 125 },
        // }, // width in pixels
        // {
        //   title: "Incident Rate",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wch: 30 },
        // }, // width in characters
        // {
        //   title: "Latitude",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 125 },
        // }, // width in pixels
        // {
        //   title: "Longitude",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 125 },
        // }, // width in pixels
        // {
        //   title: "Last Update",
        //   style: { font: { sz: "18", bold: true } },
        //   width: { wpx: 110 },
        // }, // width in pixels
      ],
      data: exporData.map((data, index = 1) => [
        {
          value: ++index,
          style: {
            font: { sz: "14" },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              right: { style: "medium" },
              left: { style: "medium" },
            },
            alignment: { horizontal: "center" },
          },
        },
        {
          value: data.cuveName,
          style: {
            font: { sz: "14" },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              right: { style: "medium" },
              left: { style: "medium" },
            },
            alignment: { horizontal: "center" },
          },
        },
        {
          value: data.quantityCurrentCuve,
          style: {
            font: { sz: "14" },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              right: { style: "medium" },
              left: { style: "medium" },
            },
            alignment: { horizontal: "center" },
          },
        },
        // {
        //   value: data.confirmed,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
        //   },
        // },
        // {
        //   value: data.deaths,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "eb1207" } },
        //   },
        // },
        // {
        //   value: data.recovered,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "4bd909" } },
        //   },
        // },
        // {
        //   value: data.active,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "ebc907" } },
        //   },
        // },
        // {
        //   value: data.incidentRate,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "35bdb4" } },
        //   },
        // },
        // {
        //   value: data.lat,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } },
        //   },
        // },
        // {
        //   value: data.long,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } },
        //   },
        // },
        // {
        //   value: data.lastUpdate,
        //   style: {
        //     font: { color: { rgb: "ffffff" } },
        //     fill: { patternType: "solid", fgColor: { rgb: "000000" } },
        //   },
        // },
      ]),
    },
  ];
  const generatePDF = () => {
    console.log(exporData.map((item) => Object.values(item)));

    console.log([Object.values({ ...exporData })]);
    var doc = new jsPDF("p", "pt");

    doc.text("Etat Cuves Mobiles", 40, 30);

    doc.autoTable({
      // html: "#my-table",
      theme: "grid",
      // head: [["CUVE MOBILE", "QUANTITE ACTUELLE"]],
      // body: exporData.map((item) => {
      //   const { cuveName, quantityCurrentCuve } = item;
      //   return Object.values({ cuveName, quantityCurrentCuve });
      // }),
      // headStyles: {
      //   cuveName: { halign: "center" },
      //   quantityCurrentCuve: { halign: "center" },
      // },
      // columnStyles: {
      //   cuveName: { halign: "center" },
      //   quantityCurrentCuve: { halign: "center" },
      // }, // European countries centered
      body: exporData.map((item, index = 1) => {
        return { ...item, id: ++index };
      }),
      columns: [
        { header: "N°", dataKey: "id" },
        { header: "CUVE MOBILE", dataKey: "cuveName" },
        { header: "QUANTITE ACTUELLE (L)", dataKey: "quantityCurrentCuve" },
      ],
    });

    doc.save("RapportEtatCuveMobile.pdf");
  };
  useEffect(() => {
    const newData = search([...cuves]);
    setExportData(newData);
    console.log(" liste cuve mobiles", cuves);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, cuves, search]);

  const handlePageClick = (event) => {
    const selected = event.selected;
    const offset = selected * pagination.numberPerPage;
    setPagination({ ...pagination, offset });
  };

  return (
    <div className="row w-100 mx-0">
      <MenuCuveMobile />
      <div className="col col-lg-10 mt-4">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a
                className="nav-link active h6 text-center"
                data-target="#stations"
                href
              >
                Liste Cuve Mobile
              </a>
            </li>
          </ul>
        </div>

        <div className=" card mt-2">
          <div className="card-body">
            <div className="card-title">
              <Search findKey={findKey} setFindKey={setFindKey} />
            </div>
            {exporData.length !== 0 ? (
              <>
                <ExcelFile
                  filename="CUVES MOBILES"
                  element={
                    <button className="btn btn-sm btn-outline-success float-right  shadow-none mb-1">
                      <i className="fa fa-upload  mr-1"> </i>Export Excel
                    </button>
                  }
                >
                  <ExcelSheet dataSet={DataSet} name="Etat cuves mobile" />
                </ExcelFile>

                <button
                  onClick={generatePDF}
                  className=" mr-2 btn btn-sm btn-outline-primary float-right  shadow-none mb-1"
                >
                  <i className="fa fa-upload  mr-1"> </i>Export PDF
                </button>
              </>
            ) : null}
            <div className="">
              <div className="table-responsive table-sm ">
                <table
                  id="my-table"
                  className="table table-bordered table-striped "
                >
                  <thead className="thead-light">
                    <tr>
                      <th className="">CUVE MOBILE</th>
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
                            {cuve.quantityCurrentCuve}
                          </td>

                          <td className="text-nowrap text-center">
                            <div class="dropdown">
                              <span
                                style={{ cursor: "pointer" }}
                                class="text-success border px-2 border-success dropdown-toggle"
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
                                      pathname: "/cuve/edit-cuve",
                                      state: cuve,
                                    }}
                                  >
                                    Modifier Cuve Mobile
                                  </Link>
                                )}
                                <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "/cuve/ravitailler-forage",
                                    state: cuve,
                                  }}
                                >
                                  Approvisionner Forage
                                </Link>
                                <Link
                                  className="dropdown-item "
                                  style={{ textDecoration: "none" }}
                                  to={{
                                    pathname: "/cuve/ravitailler-vehicule",
                                    state: cuve,
                                  }}
                                >
                                  Ravitailler Véhicule
                                </Link>
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

export default CuveList;
