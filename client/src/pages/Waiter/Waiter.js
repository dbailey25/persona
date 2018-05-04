import React, { Component } from "react";
import { Col, Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import MenuCard from "../../components/MenuCard";
import "./Waiter.css"
import API from "../../utils/API";

class Waiter extends Component {
  state = {
    bevPref: "N/A",
    restriction: "None",
    appPref: "N/A",
    protPref: "N/A",
    vegPref: "N/A",
    starchPref: "N/A",
    dessertPref: "N/A",
    firstName: "N/A",
    lastName: "N/A",
    table: 1,
    position: 1,
    menu: []
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

getMenuData = event => {
  event.preventDefault();
  API.getMenuData()
.then(res => this.hadleMenuData(res.data))
.catch(err => console.log(err));
}

postOrder = (data) =>{
  console.log(data)
  
}

hadleMenuData = (data) => {
  this.setState({menu: data});
 console.log(this.state.menu);
 }
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
          <p>Appetizer: {this.state.appPref}</p>
          <p>Protein: {this.state.protPref}</p>
          <p>Vegetable: {this.state.vegPref}</p>
          <p>Starch: {this.state.starchPref}</p>
          <p>Dessert: {this.state.dessertPref}</p>
        </Col>
        </Row>
        <Row>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#orderModal" onClick={this.getMenuData}>Take Order</button>
        </Row>

        {/* Modal =======================================================================*/}

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
                

          <Wrapper>
            {this.state.menu
               .map(dishes => (
                <MenuCard
                  key={dishes._id}
                  date={dishes.date}
                  dishName={dishes.dishName}
                  menuSelection={dishes.menuSelection}
                  postOrder={this.postOrder}
              />))}
                  
          </Wrapper> 
                
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
