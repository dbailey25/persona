const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  faceId: { type: String, required: true},
  customerId: { type: String, required: true },
  waiterId: { type: String, required: true},
  orderStatus: { type: String, required: true},
  dishName: { type: String, required: false },
  alias: { type: String, required: false },
  menuSelection: { type: String, required: false },
  photo: { type: String, required: false },
  table: { type: Number, required: false },
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
