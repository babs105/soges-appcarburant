import React from "react";

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

function ExportExcelRaviCP({ exporData, title }) {
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
        },

        {
          title: "CUVE PRINCIPALE",
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
          title: "QUANTITE",
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
        // width in pixels
        // width in pixels
        // width in characters
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
          value: data.dateRavitaillementCuveMobile,
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
          value: data.cuvePrincipale,
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
          value: data.cuveMobile,
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
          value: data.quantiteRavitaillee,
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
  return (
    <div>
      {exporData.length !== 0 && (
        <ExcelFile
          filename={title}
          element={
            <button className="btn btn-sm btn-outline-success float-right shadow-none my-1 mr-4">
              <i className="fa fa-upload  mr-1"> </i>Export Excel
            </button>
          }
        >
          <ExcelSheet dataSet={DataSet} name={title} />
        </ExcelFile>
      )}
    </div>
  );
}

export default ExportExcelRaviCP;
