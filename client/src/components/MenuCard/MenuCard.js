import React from "react";
// import "./MenurCard.css";

// Character card component
const CharacterCard = props => (
  <div className="card col-3 col-md-4 m-2">
   
    <h3 className="text-center">{props.dishName}</h3>
  </div>
  
);

export default CharacterCard;
