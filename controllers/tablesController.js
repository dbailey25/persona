const db = require("../models");

// Defining methods for the tablesController
module.exports = {
  findAll: function(req, res) {
    db.Table
      .find(req.query)
      .sort({ tableNumber: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Table
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Table
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Table
      .findOneAndUpdate({ tableNumber: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateAsClosed: function(req, res) {
    db.Table
      .findOneAndUpdate({ tableNumber: req.params.id }, {
        tableAvailability: "available",
        customerId: undefined,
        customerName: "",
        tableImg: ""})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }, 

  remove: function(req, res) {
    db.Table
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
