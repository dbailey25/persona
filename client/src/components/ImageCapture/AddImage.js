import React from "react";
import "./ImageCapture.css"

export const AddImage = props => (
  <form className={props.visibility}>
  <div className="text-center font">
    <div className="top-margin-15">Enter Name</div>
      <input
        className="form-control form-input-pers"
        value={props.name}
        onChange={props.handleInputChange}
        name="name"
        placeholder={props.name}
      />
       <button type="submit" className="btn button" onClick={props.addPhoto}>Add Photo to Collection</button>
       <div id='addConfirm'>{props.addConfirm}</div>
       </div>
    </form>
);
