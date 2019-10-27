import React from "react";

const FilterToDos = props => {
  return (
    <div>
      <input
        type="checkbox"
        id="showComplete"
        checked={props.showComplete}
        onChange={props.handleCompleteFilter}
      ></input>
      <label htmlFor="showComplete">Show Complete</label>
    </div>
  );
};

export default FilterToDos;
