import React from "react";
import "./MenuCard.css";

// Menu card component
const MenuCard = props => (
  <button onClick={() => props.postOrderData(props)}>
       {props.dishName}
  </button>

);

export default MenuCard;
