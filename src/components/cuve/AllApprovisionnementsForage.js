import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../components/search/Search";
import { TableListContext } from "../../context/TableListContext";
import ReactPaginate from "react-paginate";
import MenuCuveMobile from "./MenuCuveMobile";
import { RavitaillementForageContext } from "../../context/RavitaillementForageContext";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function AllApprovisionnementsForage() {
  const { ravitaillementForages } = useContext(RavitaillementForageContext);
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
          width: { wpx: 125 },
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
          width: { wch: 30 },
        }, // width in characters
        {
          title: "FORAGE",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: "CUVE MOBILE",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "Qté DEPOSEE",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        }, // width in pixels
        {
          title: "Qté EN STOCK",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        }, // width in pixels
        {
          title: "CONDUCTEUR",
          style: { font: { sz: "18", bold: true } },
          width: { wch: 30 },
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
          value: data.dateApprov,
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
          value: data.nomForage,
          style: {
            font: { color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
          },
        },
        {
          value: data.cuveName,
          style: {
            font: { color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "eb1207" } },
          },
        },
        {
          value: data.quantiteApprov,
          style: {
            font: { color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "4bd909" } },
          },
        },
        {
          value: data.quantiteStock,
          style: {
            font: { color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "ebc907" } },
          },
        },
        {
          value: data.nomConducteur,
          style: {
            font: { color: { rgb: "ffffff" } },
            fill: { patternType: "solid", fgColor: { rgb: "35bdb4" } },
          },
        },
      ]),
    },
  ];
  const generatePDF = () => {
    console.log(exporData.map((item) => Object.values(item)));

    var doc = new jsPDF("p", "pt");
    doc.text("Détails Ravitaillements Forages", 40, 30);
    doc.autoTable({
      // html: "#my-table",
      theme: "grid",
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
        { header: "DATE HEURE", dataKey: "dateApprov" },
        { header: "FORAGE", dataKey: "nomForage" },
        { header: "CUVE MOBILE", dataKey: "cuveName" },
        { header: "Qté DEPOSEE", dataKey: "quantiteApprov" },
        { header: "Qté EN STOCK", dataKey: "quantiteStock" },
        { header: "CONDUCTEUR", dataKey: "nomConducteur" },
      ],
    });

    doc.save("demo.pdf");
  };
  useEffect(() => {
    console.log("in all ravitaillementForages");
    console.log("les ravitaillementForages", ravitaillementForages);

    const newData = search([...ravitaillementForages]);
    setExportData(newData);
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
              <a className="nav-link active h6 " data-target="#stations" href>
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
            {exporData.length !== 0 ? (
              <>
                <ExcelFile
                  filename="APPROVISIONNEMENT FORAGE"
                  element={
                    <button className="btn btn-sm btn-outline-success float-right  shadow-none mb-1">
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
                  className=" mr-2 btn btn-sm btn-outline-primary float-right  shadow-none mb-1"
                >
                  <i className="fa fa-upload  mr-1"> </i>Export PDF
                </button>
              </>
            ) : null}
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
