import React from "react";
import "./OrderCard.css";
// import { Col, Row } from "../Grid";
// Character card component
const OrderCard = props => (
  <div>
       
        <p>{props.dishName}: {props.price}</p>
   
  </div>
);

export default OrderCard;
