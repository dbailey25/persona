const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  id: { type: String, required: true},
  faceId: { type: String, required: true},
  name: { type: String, required: true },
  photo: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
