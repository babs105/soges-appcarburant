import React from "react";

function Search({ findKey, setFindKey }) {
  return (
    <>
      {/* <label>Rechercher</label> */}
      <div>
        <input
          className="form-control w-100"
          type="text"
          value={findKey}
          placeholder="Rechercher"
          onChange={(event) => setFindKey(event.target.value)}
        />
      </div>
    </>
  );
}

export default Search;
