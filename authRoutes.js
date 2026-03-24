const express = require("express");
const router = express.Router();

const User = require("./User");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("success");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (user) res.send("success");
  else res.send("fail");
});

module.exports = router;