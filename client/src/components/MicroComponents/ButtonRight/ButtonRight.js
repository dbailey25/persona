import React from "react";

const ButtonRight = props => (
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg btn-primary"
      >
        Submit
      </button>
    </div>
);

export default ButtonRight;
