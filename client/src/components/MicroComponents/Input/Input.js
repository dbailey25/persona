import React from "react";

const Input = props => (
      <input
        className="form-control"
        id="topic"
        type="text"
        value={props.q}
        placeholder="Net Neutrality"
        name="q"
        onChange={props.handleInputChange}
        required
      />
);

export default Input;
