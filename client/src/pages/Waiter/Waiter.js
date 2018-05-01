import React, { Component } from "react";
// import API from "../../utils/API";
import { Col, Row } from "../../components/Grid";
import "./Waiter.css"

class Waiter extends Component {
  state = {
    bevPref: "N/A",
    restriction: "None",
    protPref: "N/A",
    vegPref: "N/A",
    starchPref: "N/A",
    firstName: "N/A",
    lastName: "N/A",
    table: 1,
    position: 1
    };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log('order placed');
  };

  render() {
    return (
      <div>
        <Row>
        <Col size="md-2">
        {/*<img className="image-small" src= {props.lastPhoto} alt="img" />*/}
        <img className="image-small"  alt="img" />
        </Col>
        <Col size="md-10">
        <p>Table: {this.state.table} Position: {this.state.position}</p>
        <p>First Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
        </Col>
        </Row>
        <Row>
          <Col size="md-6">
            <h3>Beverage</h3>
            <p>{this.state.bevPref}</p>
            <h3>Restrictions</h3>
            <p>{this.state.restriction}</p>
          </Col>
          <Col size="md-6">
          <h3>Food</h3>
          <p>Prot: {this.state.protPref}</p>
          <p>Veg: {this.state.vegPref}</p>
          <p>Starch: {this.state.starchPref}</p>
        </Col>
        </Row>
        <Row>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#orderModal">Take Order</button>
        </Row>

        <div className="modal fade" id="orderModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderModalLabel">Order for First Name: {this.state.firstName} Last Name: {this.state.lastName}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <Row>
                      <Col size="md-6">
                        <h3>Beverage</h3>
                        <div className="dropdown">
                          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Beverage
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" value="beer">Beer</button>
                            <button className="dropdown-item" type="button" value="wine">Wine</button>
                            <button className="dropdown-item" type="button" value="tea">Tea</button>
                          </div>
                        </div>
                      </Col>
                      <Col size="md-6">
                        <h3>Food</h3>
                        <div className="dropdown">
                          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Appetizer
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" value="calamari">Calamari</button>
                            <button className="dropdown-item" type="button" value="wings">Chicken Wings</button>
                            <button className="dropdown-item" type="button" value="mozz_sticks"> Mozzarella Sticks</button>
                          </div>
                        </div>
                        <div className="dropdown">
                          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Main Course
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" value="fiesta_chicken">Fiesta Lime Chicken</button>
                            <button className="dropdown-item" type="button" value="bourbon_chicken">Bourbon Street Chicken</button>
                            <button className="dropdown-item" type="button" value="steak">Top Sirloin</button>
                            <button className="dropdown-item" type="button" value="ribs">Baby Back Ribs</button>
                            <button className="dropdown-item" type="button" value="salmon">Cedar Salmon</button>
                            <button className="dropdown-item" type="button" value="tuna">Seared Ahi</button>
                          </div>
                        </div>
                        <div className="dropdown">
                          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dessert
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button" value="cake">Chocolate Cake</button>
                            <button className="dropdown-item" type="button" value="ice_cream">Ice Cream Trio</button>
                            <button className="dropdown-item" type="button" value="cheesecake"> New York Cheesecake</button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={this.handleFormSubmit}>Send Order</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Waiter;