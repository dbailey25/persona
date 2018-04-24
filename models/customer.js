const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  id: { type: String, required: true},
  faceId: { type: String, required: true},
  name: { type: String, required: true },
  photo: { type: Buffer, required: false },
  table: { type: Boolean, required: false },
  date: { type: Date, default: Date.now }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
