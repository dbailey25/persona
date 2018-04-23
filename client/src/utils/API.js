import axios from "axios";

export default {

  // Saves a book to the database
  checkImg: function(imageData) {
    return axios.post("/api/aws", {imageData});
  }
};
