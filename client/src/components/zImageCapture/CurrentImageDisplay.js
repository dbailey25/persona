import React from "react";
// import 'bulma/css/bulma.css'

export const CurrentImageDisplay = props => (
  <div>
  <br />
    <div>
      <h4>Current Image</h4>
      <img
      src= {props.lastPhoto}
      alt="img" />
    </div>
    <br />
  </div>
);
