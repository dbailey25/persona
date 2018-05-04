import React from "react";
import "./MenuCard.css";

// Character card component
const CharacterCard = props => (
  <button onClick={() => props.postOrder(props)}>
       {props.dishName}
  </button>
  
);

export default CharacterCard;
