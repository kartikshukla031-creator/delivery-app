const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  location: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model("Order", orderSchema);