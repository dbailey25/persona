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
    type: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Wine",
    type: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Tea",
    type: "Beverage",
    date: new Date(Date.now())
  },
  {
    dishName: "Calamari",
    type: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chicken Wings",
    type: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Salad",
    type: "Appetizer",
    date: new Date(Date.now())
  },
  {
    dishName: "Chiken",
    type: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Steak",
    type: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Salmon",
    type: "Protein",
    date: new Date(Date.now())
  },
  {
    dishName: "Pasta",
    type: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Potato",
    type: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Rice",
    type: "Starch",
    date: new Date(Date.now())
  },
  {
    dishName: "Carrots",
    type: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Broccoli",
    type: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Brussel Sprouts",
    type: "Vegetable",
    date: new Date(Date.now())
  },
  {
    dishName: "Chocolate Cake",
    type: "Desert",
    date: new Date(Date.now())
  },
  {
    dishName: "Ice Cream Trio",
    type: "Desert",
    date: new Date(Date.now())
  },
  {
    dishName: "New York Cheesecake",
    type: "Desert",
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
