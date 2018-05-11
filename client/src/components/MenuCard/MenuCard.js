import React from "react";
import "./MenuCard.css";
import { Alert } from 'reactstrap';

// Menu card component
const MenuCard = props => (
  <Alert className="dish" onClick={() => props.postOrderData(props)}>
       {props.dishName}
  </Alert>

);

export default MenuCard;
