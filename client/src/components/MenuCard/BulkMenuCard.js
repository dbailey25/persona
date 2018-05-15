import React from "react";
import "./MenuCard.css";
import { Alert } from 'reactstrap';

// Menu card component
export const BulkMenuCard = props => (
  <Alert className="dish" onClick={() => props.postOrderData(props)}>
       {props.dishName}{`(${props.itemCount})`}
  </Alert>

);
