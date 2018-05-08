import React from "react";
// import 'bulma/css/bulma.css'

export const ImageDisplay = props => (
  <div>
  <br />
    <div className={props.currentPicVisibility}>
      <h4>Current Image</h4>
      <img
      src= {props.lastPhoto}
      alt="img" />
    </div>
    <br />
    <div className={props.initialPicVisibility}>
      <h4>Intitial Image</h4>
      <img
      src= {props.initialPhoto}
      alt="img" />
    </div>
  </div>
);
