import axios from "axios";

export default {

  // checks AWS for image match
  checkImg: function(imageData) {
    return axios.post("/api/aws", {imageData});
  },

  addImg: function(imageData) {
    return axios.post("/api/aws/collection", {imageData});
  },

  // Gets a customer with the given id
  getCustomer: function(id) {
    return axios.get("/api/customers/" + id);
},

  postCustomer: function(data){
    console.log(data);
    return axios.post("api/customers/", data)
  },

  //get Menu Data
  getMenuData: function(){
    return axios.get("api/menu")
  },

  // create order in database
  postOrder: function(data){
    console.log(data);
    return axios.post("api/orders/", data)
  }
};
