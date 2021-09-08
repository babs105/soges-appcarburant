import React from "react";

function Search({ findKey, setFindKey }) {
  return (
    <>
      {/* <label>Rechercher</label> */}
      <div className=" d-flex  align-items-center">
        <i
          className="fa fa-search p-2   border bg-light text-primary  "
          style={{
            fontSize: "20px",
          }}
        ></i>
        <input
          className="form-control  "
          type="text"
          value={findKey}
          // placeholder="Rechercher"
          onChange={(event) => setFindKey(event.target.value)}
        />
      </div>
    </>
  );
}

export default Search;
