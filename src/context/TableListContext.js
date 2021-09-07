import React, { createContext, useState, useEffect } from "react";

export const TableListContext = createContext();

export const TableListProvider = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nombrePerPage, setNombrePerPage] = useState(60);
  const [findKey, setFindKey] = useState("");
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    console.log("dans TableListProvider");
  }, []);
  const search = (rows) => {
    if (findKey === "") return rows;
    else {
      return rows.filter((row) =>
        Object.values(row)
          .join(" ")
          .toLowerCase()
          .includes(findKey.toLowerCase())
      );
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <TableListContext.Provider
      value={{
        paginate,
        search,
        currentPage,
        findKey,
        setFindKey,
        logging,
        setLogging,
        nombrePerPage,
      }}
    >
      {props.children}
    </TableListContext.Provider>
  );
};
