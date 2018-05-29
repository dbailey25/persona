import React from "react";

const FormLabel = props => (
      <label htmlFor={props.label}>
        <strong>{props.label}</strong>
      </label>
);

export default FormLabel;
