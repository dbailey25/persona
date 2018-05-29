import React from "react";
import "./UserName.css"

const UserName = props => (
  <div className='username'>
    <h4>User: {props.userName}</h4>
  </div>
);

export default UserName;
