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
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Wine",
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Tea",
    menuSelection: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Calamari",
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chicken Wings",
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Salad",
    menuSelection: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chiken",
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Steak",
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Salmon",
    menuSelection: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Pasta",
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Potato",
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Rice",
    menuSelection: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Carrots",
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Broccoli",
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Brussel Sprouts",
    menuSelection: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Chocolate Cake",
    menuSelection: "Desert",
    date: new Date(Date.now())
  },
  {
    dishName: "Ice Cream Trio",
    menuSelection: "Desert",
    date: new Date(Date.now())
  },
  {
    dishName: "New York Cheesecake",
    menuSelection: "Desert",
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
