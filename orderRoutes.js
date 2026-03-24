const express = require("express");
const router = express.Router();

const Order = require("./Order");
const optimize = require("./optimizer");
const explainRoute = require("./ai");

// add
router.post("/add", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.send(order);
});

// get
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

// optimize + AI
router.get("/optimize", async (req, res) => {
  const orders = await Order.find();

  const route = optimize(orders);
  const explanation = explainRoute(route);

  res.send({ route, explanation });
});

module.exports = router;