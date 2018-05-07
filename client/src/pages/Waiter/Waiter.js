import React, { Component } from "react";
import { Col, Row } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import MenuCard from "../../components/MenuCard";
import "./Waiter.css"
import API from "../../utils/API";
import TableCard from "../../components/TableCard";
import OrderCard from "../../components/OrderCard";
import CheckCard from "../../components/CheckCard";

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
    orders: [],
    check: []
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

  API.getHistoricalData(data.customerId)
   .then(res => this.handleHistoricalData(res.data))
   .catch(err => console.log(err));
}

handleHistoricalData = data => {
  let appetizer = [{dish: "N/A", value: 0}];
  let beverage = [{dish: "N/A", value: 0}];
  let protein = [{dish: "N/A", value: 0}];
  let vegetable = [{dish: "N/A", value: 0}];
  let starch = [{dish: "N/A", value: 0}];
  let dessert = [{dish: "N/A", value: 0}];


  for (let value of data){
    if(value._id.menu === "Appetizer"){
      appetizer.push({dish: value._id.dish, value: value.count});
    }else if(value._id.menu === "Beverage"){
      beverage.push({dish: value._id.dish, value: value.count});
    }else if(value._id.menu === "Protein"){
      protein.push({dish: value._id.dish, value: value.count});
    }else if(value._id.menu === "Vegetable"){
      vegetable.push({dish: value._id.dish, value: value.count});
    }else if(value._id.menu === "Starch"){
      starch.push({dish: value._id.dish, value: value.count});
    }else if(value._id.menu === "Dessert"){
      dessert.push({dish: value._id.dish, value: value.count});
    }
    }


   let obj1 = Math.max.apply(Math,appetizer.map(function(o){return o.value;}));
   let app = appetizer.find(function(o){ return o.value === obj1; });

   let obj2 = Math.max.apply(Math,beverage.map(function(o){return o.value;}));
   let bev = beverage.find(function(o){ return o.value === obj2; });

   let obj3 = Math.max.apply(Math,protein.map(function(o){return o.value;}));
   let prot = protein.find(function(o){ return o.value === obj3; });

   let obj4 = Math.max.apply(Math,vegetable.map(function(o){return o.value;}));
   let veg = vegetable.find(function(o){ return o.value === obj4; });

   let obj5 = Math.max.apply(Math,starch.map(function(o){return o.value;}));
   let star = starch.find(function(o){ return o.value === obj5; });

   let obj6 = Math.max.apply(Math,dessert.map(function(o){return o.value;}));
   let dess = dessert.find(function(o){ return o.value === obj6; });


   this.setState({
    bevPref: bev.dish,
    appPref: app.dish,
    protPref: prot.dish,
    vegPref: veg.dish,
    starchPref: star.dish,
    dessertPref: dess.dish
   })
}


getCheck = () => {
  API.getTotalAmount(this.state.faceId)
  .then(res=>this.handleTotalCheck(res.data))
  .catch(err => console.log(err));
}

handleTotalCheck = data => {
  this.setState({check: data})
};

closeTable = () =>{
  API.closeCurrentOrders(this.state.faceId)
  .then(res=> this.emptyCurrentOrders(res.data))
  .catch(err => console.log(err));

  API.closeTable(this.state.table)
  .then(res=> console.log(res.data))
  .catch(err => console.log(err));
}

emptyCurrentOrders = () =>{
  this.setState({orders:[]})
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
        <br></br>
        <Row>
        <button type="button" className={`btn btn-primary ${this.state.initialPicVisibility}`}  data-toggle="modal" data-target="#calculationModal" onClick={this.getCheck}>Calculation</button>
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

     {/* Calculation Modal =======================================================================*/}
     <div className="modal fade" id="calculationModal" tabIndex="-1" role="dialog" aria-labelledby="orderModalLabel" aria-hidden="true">
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
            {this.state.check
               .map(dish => (
                <CheckCard
                  key={dish._id}
                  dish={dish._id}
                  total={dish.total}
              />))}
          </Wrapper>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={this.closeTable}>Close Table</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Waiter;
