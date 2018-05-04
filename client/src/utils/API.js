import axios from "axios";

export default {

  // checks AWS for image match
  checkImg: function(imageData) {
    return axios.post("/api/aws", {imageData});
  },

  addImg: function(imageData) {
    return axios.post("/api/aws/collection", {imageData});
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

  // Order Data
  postOrder: function(data){
    console.log(data);
    return axios.post("api/orders/", data)
  },

  //Table Data
  getTablesData: function(){
    return axios.get("api/table")
  },

  putTable: function(id, data){
    return axios.put("api/table/" + id, data)
  }
};
