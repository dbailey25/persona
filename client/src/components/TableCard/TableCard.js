import React from "react";
import "./TableCard.css";

// Character card component
const TableCard = props => (
  <div>
  <img className="tableImage close" data-dismiss="modal" aria-label="Close" src={props.tableImg} onClick={() => props.handlePutTable(props.tableNumber, props)} alt="img"/>
       <h3>{props.tableNumber}</h3>
  </div>
);

export default TableCard;
