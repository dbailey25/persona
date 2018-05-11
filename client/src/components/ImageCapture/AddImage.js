import React from "react";
import "./ImageCapture.css"

export const AddImage = props => (
  <form className={props.visibility}>
  <div className="text-center">
      <input
        className="form-control form-input-pers"
        value={props.name}
        onChange={props.handleInputChange}
        name="name"
        placeholder="Name"
      />
       <button type="submit" className="btn button" onClick={props.addPhoto}>Add Photo to Collection</button>
       <div id='addConfirm'>{props.addConfirm}</div>
       </div>
    </form>
);
