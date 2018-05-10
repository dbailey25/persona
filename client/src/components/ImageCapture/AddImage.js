import React from "react";

export const AddImage = props => (
  <form className={props.visibility}>
      <input
        className="form-control"
        value={props.name}
        onChange={props.handleInputChange}
        name="name"
        placeholder="Name"
      />
       <button type="submit" className="btn btn-lg btn-primary" onClick={props.addPhoto}>Add Photo to Collection</button>
       <div id='addConfirm'>{props.addConfirm}</div>
    </form>
);
