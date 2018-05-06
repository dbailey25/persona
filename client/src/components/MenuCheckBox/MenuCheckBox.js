import React from "react";
// import "./MenuCheckBox.css";

// MenuCheckBox card component
const MenuCheckBox = props => (
  <div className="form-check">
    <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={() => props.postOrder(props)}/>
  </div>
);

export default MenuCheckBox;
