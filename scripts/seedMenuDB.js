const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Menu collection and inserts the dishes below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/persona"
);

const menuSeed = [
  {
    dishName: "Beer",
    alias: "beer",
    price: 5.99,
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Wine",
    alias: "wine",
    price: 7.99,
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Tea",
    alias: "tea",
    price: 4.99,
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Calamari",
    alias: "cala",
    price: 8.49,
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chicken Wings",
    alias: "wing",
    price: 10.99,
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Salad",
    alias: "sald",
    price: 9.99,
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chicken",
    alias: "chkn",
    price: 12.49,
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Steak",
    alias: "beef",
    price: 15.99,
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Salmon",
    alias: "fish",
    price: 13.49,
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Pasta",
    alias: "past",
    price: 5.99,
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Potato",
    alias: "pota",
    price: 5.99,
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Rice",
    alias: "rice",
    price: 5.99,
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Carrots",
    alias: "carr",
    price: 4.99,
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Broccoli",
    alias: "broc",
    price: 4.99,
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Brussel Sprouts",
    alias: "sprt",
    price: 4.99,
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Chocolate Cake",
    alias: "cake",
    price: 6.99,
    menuSelection: "Dessert",
    date: new Date(Date.now())
  },
  {
    dishName: "Ice Cream Trio",
    alias: "icrm",
    price: 5.99,
    menuSelection: "Dessert",
    date: new Date(Date.now())
  },
  {
    dishName: "New York Cheesecake",
    alias: "ccke",
    price: 7.99,
    menuSelection: "Dessert",
    date: new Date(Date.now())
  }
];

db.Menu
  .remove({})
  .then(() => db.Menu.collection.insertMany(menuSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  
