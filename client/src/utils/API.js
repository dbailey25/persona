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
}
};
