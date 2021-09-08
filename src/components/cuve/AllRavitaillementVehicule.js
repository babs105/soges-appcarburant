import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import { RajoutContext } from "../../context/RajoutContext";

import ReactPaginate from "react-paginate";
import { RavitaillementContext } from "../../context/RavitaillementVehiculeContext";
import MenuCuveMobile from "./MenuCuveMobile";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function AllRavitaillementVehicule() {
  const { ravitaillements } = useContext(RavitaillementContext);
  const { logging, findKey, search, setFindKey } = useContext(TableListContext);

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
          width: { wch: 2 },
        }, // width in pixels
        {
          title: "DATE HEURE",
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
          width: { wch: 20 },
        }, // width in characters
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
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "QUANTITE (état)",
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
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "Qté RAVITAILLEE",
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
          width: { wch: 20 },
        }, // width in pixels
        {
          title: "MATRICULE",
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
          width: { wch: 15 },
        }, // width in pixels
        {
          title: "KILOMETRAGE",
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
          width: { wch: 20 },
        },
        {
          title: "CONDUCTEUR",
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
          width: { wch: 20 },
        }, // width in characters
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
          value: data.dateRavitaillement,
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
          font: { sz: "14" },
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
        {
          value: data.quantityRavitaillement,
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
          value: data.immatricule,
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
          value: data.kilometrageCurrent,
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
          value: data.chauffeur,
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
      ]),
    },
  ];
  const generatePDF = () => {
    console.log(exporData.map((item) => Object.values(item)));

    var doc = new jsPDF("p", "pt");
    doc.text("Détails Ravitaillements Véhicules", 40, 30);
    doc.autoTable({
      // html: "#my-table",
      theme: "grid",
      styles: { cellWidth: "auto" },
      // head: [["CUVE MOBILE", "QUANTITE ACTUELLE"]],
      // body: exporData.map((item) => {
      //   const { cuveName, quantityCurrentCuve } = item;
      //   return Object.values({ cuveName, quantityCurrentCuve });
      // }),
      headStyles: {
        cuveName: { halign: "center" },
        quantityCurrentCuve: { halign: "center" },
      },
      // columnStyles: {
      //   cuveName: { halign: "center" },
      //   quantityCurrentCuve: { halign: "center" },
      // }, // European countries centered
      body: exporData.map((item, index = 1) => {
        return { ...item, id: ++index };
      }),
      columns: [
        { header: "N°", dataKey: "id" },
        { header: "DATE HEURE", dataKey: "dateRavitaillement" },
        { header: "CUVE MOBILE", dataKey: "cuveName" },
        { header: "QUANTITE (état)", dataKey: "quantityCurrentCuve" },
        { header: "Qté RAVITAILLEE ", dataKey: "quantityRavitaillement" },
        { header: "MATRICULE", dataKey: "immatricule" },
        { header: "KILOMETRAGE", dataKey: "kilometrageCurrent" },
        { header: "CATEGORIE", dataKey: "categorie" },
        // { header: "CONDUCTEUR", dataKey: "chauffeur" },
      ],
    });

    doc.save("RapportRavitaillementVéhicule.pdf");
  };
  useEffect(() => {
    console.log("in all ravitaillementsVehicule");
    console.log("les ravitaillementsVehicules", ravitaillements);

    const newData = search([...ravitaillements]);
    setExportData(newData);
    console.log(" les ravitaillements", ravitaillements);
    setPagination((prevState) => ({
      ...prevState,
      pageCount: newData.length / prevState.numberPerPage,
      currentData: newData.slice(
        pagination.offset,
        pagination.offset + pagination.numberPerPage
      ),
    }));
  }, [pagination.numberPerPage, pagination.offset, ravitaillements, search]);

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
                Ravitailements Véhicules
              </a>
            </li>
          </ul>
        </div>
        <div className="card mt-2 ">
          <div>
            <Link to="/cuve" className="my-link p-2 " style={{ width: "8rem" }}>
              <i className="fa fa-arrow-left mr-1"></i>
              Retour Liste
            </Link>
            {exporData.length !== 0 ? (
              <>
                <ExcelFile
                  filename="APPROVISIONNEMENT FORAGE"
                  element={
                    <button className="btn btn-sm btn-outline-success float-right shadow-none my-1 mr-4">
                      <i className="fa fa-upload  mr-1"> </i>Export Excel
                    </button>
                  }
                >
                  <ExcelSheet
                    dataSet={DataSet}
                    name="Rapport Ravitaillement des Forages"
                  />
                </ExcelFile>

                <button
                  onClick={generatePDF}
                  className=" mr-2 btn btn-sm btn-outline-primary float-right  shadow-none my-1"
                >
                  <i className="fa fa-upload  mr-1"> </i>Export PDF
                </button>
              </>
            ) : null}
          </div>
          <div className=" card-body pt-0">
            <div className=" card-title">
              <Search findKey={findKey} setFindKey={setFindKey} />
            </div>
            {/* <h6 className="mt-2">Ravitaillements Véhicules</h6> */}

            <div className="table text-sm">
              <div className="table-responsive table-sm ">
                <table className="table table-bordered table-striped ">
                  <thead className="thead-light">
                    <tr className="text-nowrap">
                      <th className="align-middle text-center">N°</th>
                      <th className=" align-middle text-center">DATE </th>
                      <th className="align-middle text-center">CUVE MOBILE</th>
                      <th className="align-middle text-center">Qté CUVE</th>
                      <th className=" text-center ">Qté RAVITAILLEE</th>
                      <th className="align-middle text-center">MATRICULE</th>
                      <th className="align-middle text-center">CATEGORIE</th>
                      <th className="align-middle text-center">KILOMETRAGE</th>
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
                        <tr key={ravitaillement.id} className=" text-nowrap">
                          <td className="align-middle text-center ">
                            {(i = i + 1)}
                          </td>

                          <td className="text-nowrap">
                            {ravitaillement.dateRavitaillement}
                          </td>
                          <td className="text-nowrap">
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
                                pathname: "/cuve/edit-ravitaillement-vehicule",
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
              <div className="mt-0">
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

export default AllRavitaillementVehicule;
