import React from "react";
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
          <th scope="col">Visit 6</th>
        </tr>
      </thead>
      <tbody>
        <h4>Beverage</h4>
        <tr>
          <th scope="row">Beer</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beer" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Wine</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wine" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wine" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wine" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wine" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wine" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wine" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Tea</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="tea" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="tea" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="tea" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="tea" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="tea" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="tea" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>
        <h4>Appetizer</h4>
        <tr>
          <th scope="row">Calamari</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cala" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cala" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cala" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cala" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cala" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cala" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Chicken Wings</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wing" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wing" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wing" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wing" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wing" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="wing" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Salad</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sald" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sald" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sald" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sald" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sald" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sald" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>
        <h4>Main Course</h4>
        <tr>
          <th scope="row">Chicken</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="chkn" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="chkn" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="chkn" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="chkn" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="chkn" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="chkn" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Steak</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beef" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beef" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beef" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beef" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beef" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="beef" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Fish</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="fish" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="fish" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="fish" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="fish" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="fish" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="fish" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>
        <h4>Starch</h4>
        <tr>
          <th scope="row">Pasta</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="past" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="past" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="past" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="past" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="past" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="past" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Potato</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="pota" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="pota" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="pota" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="pota" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="pota" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="pota" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Rice</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="rice" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="rice" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="rice" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="rice" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="rice" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="rice" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>
        <h4>Vegetables</h4>
        <tr>
          <th scope="row">Carrots</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="carr" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="carr" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="carr" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="carr" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="carr" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="carr" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Broccoli</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="broc" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="broc" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="broc" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="broc" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="broc" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="broc" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Sprouts</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sprt" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sprt" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sprt" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sprt" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sprt" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="sprt" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>
        <h4>Dessert</h4>
        <tr>
          <th scope="row">Cake</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cake" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cake" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cake" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cake" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cake" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="cake" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Ice Cream</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="icrm" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="icrm" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="icrm" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="icrm" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="icrm" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="icrm" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>

        <tr>
          <th scope="row">Cheesecake</th>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="ccke" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="ccke" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="ccke" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="ccke" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="ccke" onClick={props.postOrder}/>
            </div>
          </td>
          <td>
            <div className="form-check">
              <input className="form-check-input position-static bulkCheckBox" type="checkbox" val="ccke" onClick={props.postOrder}/>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default BulkOrder;
