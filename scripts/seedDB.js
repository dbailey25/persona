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
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Wine",
    alias: "wine",
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Tea",
    alias: "tea",
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Calamari",
    alias: "cala",
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chicken Wings",
    alias: "wing",
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Salad",
    alias: "sald",
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chicken",
    alias: "chkn",
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Steak",
    alias: "beef",
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Salmon",
    alias: "fish",
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Pasta",
    alias: "past",
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Potato",
    alias: "pota",
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Rice",
    alias: "rice",
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Carrots",
    alias: "carr",
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Broccoli",
    alias: "broc",
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Brussel Sprouts",
    alias: "sprt",
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Chocolate Cake",
    alias: "cake",
    menuSelection: "Dessert",
    date: new Date(Date.now())
  },
  {
    dishName: "Ice Cream Trio",
    alias: "icrm",
    menuSelection: "Dessert",
    date: new Date(Date.now())
  },
  {
    dishName: "New York Cheesecake",
    alias: "ccke",
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
