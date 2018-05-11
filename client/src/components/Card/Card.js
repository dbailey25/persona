import React from "react";
import './Card.css';

const Card = props => (
  <div className="card mt-4">
    <div className="card-header header-style">
      <h3>
        <strong>
          {props.title}
        </strong>
      </h3>
    </div>
    <div className="card-body">{props.children}</div>
  </div>
);

export default Card;
