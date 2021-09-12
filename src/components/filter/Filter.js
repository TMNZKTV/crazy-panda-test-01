import React from "react";

const Filter = ({ searchValue, onChange }) => {
  return (
    <div>
      <input
        className="form-control"
        placeholder="Search here"
        type="text"
        value={searchValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Filter;
