import axios from "axios";

export default {

  // checks AWS for customer photo match
  checkImg: function(imageData) {
    return axios.post("/api/aws", {imageData});
  },

  //add customer photo to AWS collection
  addImg: function(imageData) {
    return axios.post("/api/aws/collection", {imageData});
  },

   // checks AWS for customer photo match
   checkEmployeesImg: function(imageData) {
    return axios.post("/api/aws/employees", {imageData});
  },

  //add customer photo to AWS collection
  addEmployeesImg: function(imageData) {
    return axios.post("/api/aws/collection/employees", {imageData});
  },

  // Customer Data
  getCustomer: function(id) {
    return axios.get("/api/customers/" + id);
},

  postCustomer: function(data){
    console.log(data);
    return axios.post("api/customers/", data)
  },

  //Menu Data
  getMenuData: function(){
    return axios.get("api/menu")
  },

  //Orders Data
  postOrder: function(data){
    return axios.post("api/order/", data)
  },

  getOrder: function(id){
    return axios.get("api/order/current-order/customer/" + id)
  },

  getTotalAmount: function(id){
    return axios.get("api/order/total/customer/" + id)
  },

  getHistoricalData: function(id){
    return axios.get("api/order/" + id)
  },

  closeCurrentOrders: function(id){
    console.log(id)
    return axios.put("api/order/closed/" + id)
  },

  //Table Data
  getTablesData: function(){
    return axios.get("api/table")
  },

  putTable: function(id, data){
    return axios.put("api/table/" + id, data)
  },

  closeTable: function(id){
    console.log(id);
    return axios.put("api/table/closed/" + id)
  },
};
