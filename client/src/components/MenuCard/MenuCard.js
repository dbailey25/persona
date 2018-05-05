import React from "react";
import "./MenuCard.css";

// Menu card component
const MenuCard = props => (
  <button onClick={() => props.postOrder(props)}>
       {props.dishName}
  </button>

);

export default MenuCard;
