import React from "react";
// import MenuCheckBox from "../MenuCheckBox";

// import "./BulkOrder.css"

const BulkOrder = props => (
  <div>
    <table className={`table ${props.visibility}`}>
      <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Visit 1</th>
          <th scope="col">Visit 2</th>
          <th scope="col">Visit 3</th>
          <th scope="col">Visit 4</th>
          <th scope="col">Visit 5</th>
        </tr>
      </thead>
      <tbody id="body">

      </tbody>
    </table>
  </div>
);

export default BulkOrder;
