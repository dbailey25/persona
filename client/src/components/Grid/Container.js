import React from "react";
import "./Container.css"

export const Container = ({ fluid, children }) => (
  <div className={`main-container container${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
