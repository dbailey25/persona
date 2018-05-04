import React, { Component } from "react";
import { Col, Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import MenuCard from "../../components/MenuCard";
import "./Waiter.css"
import API from "../../utils/API";
import TableCard from "../../components/TableCard";
import OrderCard from "../../components/OrderCard";

class Waiter extends Component {
  state = {
    faceId: "",
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
    tableImg: "",
    menu: [],
    tables: [],
    orders: []
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

hadleMenuData = (data) => {
  this.setState({menu: data});
 console.log(this.state.menu);
 }

postOrderData = (data) =>{
  API.postOrder({
  customerId: this.state.faceId,
  orderStatus: "open",
  dishName: data.dishName,
  alias: data.alias,
  price: data.price,
  menuSelection: data.menuSelection,
  table: this.state.table
  })
.then(res => this.getCurrentOrderData(res.data))
.catch(err => console.log(err));
}

getCurrentOrderData = data =>{
  
 API.getOrder(data.customerId)
 .then(res => this.handleDisplayOrders(res.data))
 .catch(err => console.log(err));
}

handleDisplayOrders = data =>{
  console.log(data)
  this.setState({orders: data})
}


getTableData = () => {
  API.getTablesData()
  .then(res => this.handleTableData(res.data))
  .catch(err => console.log(err));
 }

 handleTableData = data => {
   for (let value of data){
     if(value.tableAvailability === "available"){
       value.tableImg = "/images/table.png";
    };
    this.setState({tables: data});
 }
 console.log(this.state.tables);
}

handleDataTable = (id, data) =>{
  this.getCurrentOrderData(data);   
API.getCustomer(data.customerId)
.then(res=>this.handleDisplayCustomerInfo(data))
.catch(err => console.log(err));
}

handleDisplayCustomerInfo = data =>{
  console.log(data);
  this.setState({
    faceId: data.customerId,
    firstName: data.customerName,
    table: data.tableNumber,
    tableImg: data.tableImg,
    
  })
}

  render() {
    return (
      <div>
        <Row>
        <Col size="md-2">
        {/*<img className="image-small" src= {props.lastPhoto} alt="img" />*/}
        <img className="image-small" src={this.state.tableImg} alt="img" />
        </Col>
        <Col size="md-10">
        <p>Table: {this.state.table} Position: {this.state.position}</p>
        <p>First Name: {this.state.firstName}</p>
        <p>Last Name: {this.state.lastName}</p>
        </Col>
        </Row>
        <Row>
          <Col size="md-4">
            <h3>Beverage</h3>
            <p>{this.state.bevPref}</p>
            <h3>Restrictions</h3>
            <p>{this.state.restriction}</p>
          </Col>
          <Col size="md-4">
          <h3>Food</h3>
          <p>Appetizer: {this.state.appPref}</p>
          <p>Protein: {this.state.protPref}</p>
          <p>Vegetable: {this.state.vegPref}</p>
          <p>Starch: {this.state.starchPref}</p>
          <p>Dessert: {this.state.dessertPref}</p>
        </Col>
        <Col size="md-4">
        <h3>Current Order</h3>
        <Wrapper>
            {this.state.orders
               .map(order => (
                <OrderCard
                  key={order._id}
                  dishName={order.dishName}
                  alias={order.alias}
                  menuSelection={order.menuSelection}
                  price={order.price}
          />))}
        </Wrapper>
        </Col>
        </Row>
        <Row>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#orderModal" onClick={this.getMenuData}>Take Order</button>
        </Row>
        <br></br>
        <Row>
        <button type="button" className={`btn btn-primary ${this.state.initialPicVisibility}`}  data-toggle="modal" data-target="#tableModal" onClick={this.getTableData}>Table</button>
        </Row>

        {/* Menu Modal =======================================================================*/}

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
                  alias={dishes.alias}
                  menuSelection={dishes.menuSelection}
                  price={dishes.price}
                  postOrderData={this.postOrderData}
              />))}
                  
          </Wrapper> 
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={this.handleFormSubmit}>Send Order</button>
              </div>
            </div>
          </div>
        </div>
     {/* Table Modal =======================================================================*/}
     <div className="modal fade" id="tableModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderModalLabel">Tables
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                

          <Wrapper>
          {this.state.tables
               .map(table => (
                <TableCard
                  key={table._id}
                  date={table.date}
                  tableNumber={table.tableNumber}
                  tableImg={table.tableImg}
                  tableAvailability={table.tableAvailability}
                  customerId={table.customerId}
                  customerName={table.customerName}
                  handleDataTable={this.handleDataTable}
                  getCurrentOrderData={this.getCurrentOrderData}
              />))}
                  
          </Wrapper> 
                
              </div>
              <div className="modal-footer">
               
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Waiter;
