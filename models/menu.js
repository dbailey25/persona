const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  id: { type: String, required: true},
  dishName: { type: String, required: true},
  protein: { type: String, required: false },
  vegetable: { type: String, required: false },
  starch: { type: String, required: false },
  calories: { type: String, required: false },
  price: { type: String, required: false }
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
