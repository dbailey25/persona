import React from "react";

const TableAssign = props => (
  <div>
    <button
    className={`btn btn-primary dropdown-toggle ${props.visibility}`} 
    type="button"
    id="tableAssign"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
    >
      Table #
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button className="dropdown-item" type="button" value="1">1</button>
      <button className="dropdown-item" type="button" value="2">2</button>
      <button className="dropdown-item" type="button" value="3">3</button>
      <button className="dropdown-item" type="button" value="4">4</button>
      <button className="dropdown-item" type="button" value="5">5</button>
      <button className="dropdown-item" type="button" value="6">6</button>
    </div>
  </div>
);

export default TableAssign;
